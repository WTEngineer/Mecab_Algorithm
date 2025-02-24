import Levenshtein

from findhandlecases import (
    find_elements_in_text_with_classification, 
    number_to_katakana_converter, 
    date_to_katakana, 
    special_character_to_katakana
)
from propre.readfilebylines import read_file_by_lines
from processmecab.extractpro import extract_pronunciation

def calculate_cer(reference_file, hypothesis_file):
    """
    Calculate the Character Error Rate (CER) between two text files.
    
    :param reference_file: Path to the correct reference text file
    :param hypothesis_file: Path to the generated hypothesis text file
    :return: CER value
    """
    # Read reference text
    with open(reference_file, 'r', encoding='utf-8') as ref_f:
        reference_text = ref_f.read().replace("\n", "")  # Remove newlines for consistency

    # Read hypothesis (generated) text
    with open(hypothesis_file, 'r', encoding='utf-8') as hyp_f:
        hypothesis_text = hyp_f.read().replace("\n", "")  # Remove newlines for consistency

    # Compute Levenshtein distance
    edit_distance = Levenshtein.distance(reference_text, hypothesis_text)

    # Compute CER
    total_characters = len(reference_text) if len(reference_text) > 0 else 1  # Avoid division by zero
    cer = edit_distance / total_characters

    return cer, edit_distance, total_characters

def show_differences(reference_file, hypothesis_file):
    """
    Shows the differences between reference and hypothesis texts.
    Highlights insertions (+), deletions (-), and substitutions (→).
    """
    # Read reference text
    with open(reference_file, 'r', encoding='utf-8') as ref_f:
        reference_text = ref_f.read().replace("\n", "")  # Remove newlines for consistency

    # Read hypothesis (generated) text
    with open(hypothesis_file, 'r', encoding='utf-8') as hyp_f:
        hypothesis_text = hyp_f.read().replace("\n", "")  # Remove newlines for consistency
    edit_operations = Levenshtein.editops(reference_text, hypothesis_text)
    reference_list = list(reference_text)
    hypothesis_list = list(hypothesis_text)
    
    ref_result = list(reference_text)  # Copy for highlighting
    hyp_result = list(hypothesis_text)  # Copy for highlighting

    for op, ref_idx, hyp_idx in reversed(edit_operations):  # Reverse to avoid index shifting
        if op == 'insert':  # Hypothesis has an extra character
            ref_result.insert(ref_idx, f"[+{hypothesis_list[hyp_idx]}]")  
        elif op == 'delete':  # Reference has a missing character
            hyp_result.insert(hyp_idx, f"[-{reference_list[ref_idx]}]")  
        elif op == 'replace':  # Different characters (substitution)
            ref_result[ref_idx] = f"[{reference_list[ref_idx]}→{hypothesis_list[hyp_idx]}]"
    
    ref_output = "".join(ref_result)
    hyp_output = "".join(hyp_result)

    return ref_output, hyp_output

# file_path = './data/iryo_org/てんかん/京都祇園軽ワゴン車暴走事故.txt'
# output_file = './result/evaluation/京都祇園軽ワゴン車暴走事故_katakana.txt'  # Output file path
# reference_file = './data/ground_trust/京都祇園軽ワゴン車暴走事故.txt'  # Reference file path

# file_path = './data/iryo_org/てんかん/大田原症候群.txt'
# output_file = './result/evaluation/大田原症候群_katakana.txt'  # Output file path
# reference_file = './data/ground_trust/大田原症候群.txt'  # Reference file path

# file_path = './data/iryo_org/てんかん/日本てんかん学会.txt'
# output_file = './result/evaluation/日本てんかん学会_katakana.txt'  # Output file path
# reference_file = './data/ground_trust/日本てんかん学会.txt'  # Reference file path

# file_path = './data/iryo_org/てんかん/池袋駅東口乗用車暴走事故.txt'
# output_file = './result/evaluation/池袋駅東口乗用車暴走事故_katakana.txt'  # Output file path
# reference_file = './data/ground_trust/池袋駅東口乗用車暴走事故.txt'  # Reference file path

file_path = './data/iryo_org/てんかん/鹿沼市クレーン車暴走事故.txt'
output_file = './result/evaluation/鹿沼市クレーン車暴走事故_katakana.txt'  # Output file path
reference_file = './data/ground_trust/鹿沼市クレーン車暴走事故.txt'  # Reference file path

# Read the file
lines = read_file_by_lines(file_path)

# Initialize an empty list to store the final converted result
final_result = []

for line in lines:
    line_result = []  # Store converted text for this line
    matches = find_elements_in_text_with_classification(line)
    
    for segment in matches:
        # print(segment)
        if segment['match']:
            if segment['type'] == 'Number':
                number = int(segment['text'])
                katakana = number_to_katakana_converter(number)
                line_result.append(katakana)  # Append converted number to line_result
            elif segment['type'] in ['Date', 'Year', 'Month', 'Day']:
                date = segment['text']
                katakana = date_to_katakana(date)
                line_result.append(katakana)  # Append converted date to line_result
            elif segment['type'] == 'English Text':
                line_result.append(segment['text'])
            elif segment['type'] == 'Special Character':
                special_char = segment['text']
                katakana = special_character_to_katakana(special_char)
                line_result.append(katakana)  # Append converted special character to line_result
        else:
            mecab_pro = extract_pronunciation(segment['text'])
            mecab_pro_str = ''.join(mecab_pro)  # Concatenate without spaces
            line_result.append(mecab_pro_str)  # Append mecab pronunciation result

    # Join processed segments for this line and add newline
    final_result.append(''.join(line_result) + "\n")

# Join all lines together
final_katakana_output = ''.join(final_result)

# Save the final result to a text file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(final_katakana_output)

# Print confirmation
print(f"Katakana result saved to: {output_file}")

# Calculate CER
cer, edit_distance, total_chars = calculate_cer(reference_file, output_file)

# Print results with CER as percentage
print(f"Character Error Rate (CER): {cer * 100:.2f}%")
print(f"Edit Distance: {edit_distance}")
print(f"Total Characters in Reference: {total_chars}")

# ref_diff, hyp_diff = show_differences(reference_file, output_file)

# print("Reference: ", ref_diff)
# print("Hypothesis:", hyp_diff)
