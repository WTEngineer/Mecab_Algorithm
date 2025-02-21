from flask import Flask, request, jsonify, url_for
from http import HTTPStatus  # This imports the HTTPStatus class for easy access to status codes.
import MeCab
import sys
from flask_cors import CORS  # Import CORS
import os
import re

from argparse import ArgumentParser
from datetime import datetime

import pandas as pd
from dotenv import load_dotenv
from openai import AzureOpenAI
from tqdm import tqdm
import traceback

load_dotenv()

CLIENT = AzureOpenAI(
    api_version=os.getenv('AZURE_OPENAI_API_VERSION', ''),
    azure_endpoint=os.getenv('AZURE_OPENAI_ENDPOINT', ''),
    api_key=os.getenv('AZURE_OPENAI_API_KEY', ''),
)

PJ_ID = 'Shourei_Imai'

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# This will be used elsewhere to initialize the tagger
DICDIR = os.path.join("../dic/", 'ipadicdicdir')

mecabrc = os.path.join(DICDIR, 'mecabrc')
MECAB_ARGS = '-r "{}" -d "{}"'.format(mecabrc, DICDIR)

notes = {
    0: 'do the shopping',
    1: 'build the codez',
    2: 'paint the door',
}

def note_repr(key):
    return {
        'url': request.host_url.rstrip('/') + url_for('notes_detail', key=key),
        'text': notes[key]
    }

@app.route("/", methods=['GET', 'POST'])
def notes_list():
    """
    List or create notes.
    """
    if request.method == 'POST':
        note = str(request.json.get('text', ''))
        idx = max(notes.keys()) + 1
        notes[idx] = note
        return jsonify(note_repr(idx)), HTTPStatus.CREATED  # Using HTTPStatus.CREATED (201)

    # request.method == 'GET'
    return jsonify([note_repr(idx) for idx in sorted(notes.keys())])

@app.route("/<int:key>/", methods=['GET', 'PUT', 'DELETE'])
def notes_detail(key):
    """
    Retrieve, update or delete note instances.
    """
    if request.method == 'PUT':
        note = str(request.json.get('text', ''))
        notes[key] = note
        return jsonify(note_repr(key))

    elif request.method == 'DELETE':
        notes.pop(key, None)
        return '', HTTPStatus.NO_CONTENT  # Using HTTPStatus.NO_CONTENT (204)

    # request.method == 'GET'
    if key not in notes:
        return jsonify({'error': 'Not Found'}), HTTPStatus.NOT_FOUND  # Using HTTPStatus.NOT_FOUND (404)
    return jsonify(note_repr(key))


# Function to process the sentence with MeCab
def process_mecab_sentence(sentence):
    try:
        # Initialize MeCab Tagger
        t = MeCab.Tagger(MECAB_ARGS)

        # Parse the sentence and get the full result
        parsed_result = t.parse(sentence)

        # Parse the sentence into nodes (for detailed analysis)
        nodes = []
        m = t.parseToNode(sentence)
        while m:
            feature = m.feature.split(',')  # Split the feature string by commas
            # Ensure there are at least 8 attributes
            if len(feature) >= 8:
                eighth_feature = feature[7]  # Get the 8th attribute (index 7)
            else:
                eighth_feature = None  # Handle cases where there are not enough attributes
            nodes.append({
                "surface": m.surface,
                "feature": m.feature,
                "eighth_feature": eighth_feature  # Add the 8th feature
            })
            m = m.next

        # Parse the sentence using lattice
        lattice = MeCab.Lattice()
        t.parse(lattice)
        lattice.set_sentence(sentence)
        lattice_result = []

        length = lattice.size()
        for i in range(length + 1):
            b = lattice.begin_nodes(i)
            e = lattice.end_nodes(i)
            while b:
                lattice_result.append({
                    "type": "B",
                    "index": i,
                    "surface": b.surface,
                    "feature": b.feature
                })
                b = b.bnext 
            while e:
                lattice_result.append({
                    "type": "E",
                    "index": i,
                    "surface": e.surface,
                    "feature": e.feature
                })
                e = e.bnext 

        # Get dictionary information
        dictionary_info = []
        d = t.dictionary_info()
        while d:
            dictionary_info.append({
                "filename": d.filename,
                "charset": d.charset,
                "size": d.size,
                "type": d.type,
                "lsize": d.lsize,
                "rsize": d.rsize,
                "version": d.version
            })
            d = d.next

        return {
            "parsed_result": parsed_result,
            "nodes": nodes,
            "lattice_result": lattice_result,
            "dictionary_info": dictionary_info
        }

    except RuntimeError as e:
        return {"error": str(e)}

def request_openai(request_id, prompt):
    output = {'request_id': request_id, 'output': '', 'n_tokens': {'prompt': 0, 'output': 0, 'total': 0}}
    try:
        reason = 'length'
        n_reqs = 0
        messages = [{'role': 'user', 'content': prompt}]
        while n_reqs < 5 and reason == 'length':
            res = CLIENT.chat.completions.create(
                messages=messages,
                model="default-4o",
                max_tokens=4000,
                top_p=1,
                temperature=0,
                frequency_penalty=0,
                presence_penalty=0,
                stop=None,
            )
            usage = res.usage
            choice = res.choices[0]
            reason = choice.finish_reason
            content = choice.message.content
            output['output'] += content
            output['n_tokens']['prompt'] += usage.prompt_tokens
            output['n_tokens']['output'] += usage.completion_tokens
            output['n_tokens']['total'] += usage.total_tokens
            n_reqs += 1
            if reason == 'length':
                messages.append({'role': 'assistant', 'content': content})
        return output
    except Exception as err:
        traceback.print_exc()
        output['output'] = f'Error: {err}'
        return output

def generate_prompt_list(user_prompt_txt, input_text):
    with open(user_prompt_txt, 'r', encoding='utf-8') as fp:
        user_prompt = fp.read()

    prompt_list = user_prompt + "\n" + input_text
    return prompt_list

# Regular expression to match "    0    " or "    1    "
pattern = r'(.*?)\s{4}[01]\s{4}(.*)'

# Function to split the line into original string and result
def split_line(line):
    match = re.match(pattern, line)
    if match:
        original = match.group(1)  # Part before the match
        result = match.group(2)    # Part after the match
        return original, result
    else:
        return line, ""  # If no match, return the whole line as original

@app.route('/process', methods=['POST'])
def process_text():
    try:
        # Get the user prompt file and input file from the request
        # user_prompt_txt = request.form['user_prompt_txt']
        user_prompt_txt = "./user_prompt.txt"
        input_file = request.files['input_file']
        
        # Read the content of the input file
        input_text = input_file.read().decode('utf-8')
        
        # Generate the prompt list
        prompt_list = generate_prompt_list(user_prompt_txt, input_text)
        
        # Generate request ID from the input file
        req_id = f'{PJ_ID}_{input_file.filename}'.replace(".txt", "")
        
        # Call OpenAI API
        res = request_openai(req_id, prompt_list)
        
        # Create an empty list to store the pairs (original, result)
        original_and_results = []

        # Process each line in the input string
        lines = res['output'].strip().split("\n")
        print(lines)
        for line in lines:
            original, result = split_line(line)
            # Add the (original, result) pair to the list
            original_and_results.append((original, result))

        # Output the array of (original, result) pairs
        for original, result in original_and_results:
            print(f"Original: {original}")
            print(f"Result: {result}")
            print("-" * 50)
        
        # Return the result as JSON
        return jsonify({
            'request_id': req_id,
            'output': original_and_results,
            'n_tokens': res['n_tokens']
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Route for the API to process the sentence
@app.route('/parse', methods=['POST'])
def parse():
    # Get the JSON data from the request
    data = request.get_json()

    # Check if 'sentence' is in the JSON data
    if not data or 'sentence' not in data:
        return jsonify({"error": "No sentence provided"}), 400

    sentence = data['sentence']

    # Process the sentence
    result = process_mecab_sentence(sentence)

    # Return the processed result as JSON
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5001)


