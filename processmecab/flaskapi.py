from flask import Flask, request, jsonify, url_for
from http import HTTPStatus  # This imports the HTTPStatus class for easy access to status codes.
import MeCab
import sys
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

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
def process_sentence(sentence):
    try:
        # Initialize MeCab Tagger
        t = MeCab.Tagger()

        # Parse the sentence and get the full result
        parsed_result = t.parse(sentence)

        # Parse the sentence into nodes (for detailed analysis)
        nodes = []
        m = t.parseToNode(sentence)
        while m:
            nodes.append({
                "surface": m.surface,
                "feature": m.feature
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
    result = process_sentence(sentence)

    # Return the processed result as JSON
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5001)


