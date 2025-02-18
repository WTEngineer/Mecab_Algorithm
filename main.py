from propre.preprocess import extract_non_japaneses
from propre.readfilebylines import read_file_by_lines

# Function to process the file line by line and handle output saving
def process_file(file_path, outfile_path, result_path, fresult_path):
    numofnj = 0
    numofsame = 0
    numofdiff = 0
    # Open the output file in append mode, so we don't overwrite existing content
    with open(outfile_path, 'w', encoding='utf-8') as output_file, open(result_path, 'w', encoding='utf-8') as result_file, open(fresult_path, 'w', encoding='utf-8') as fresult_file:
        # Read the file lines using the read_file_by_lines function
        lines = read_file_by_lines(file_path)

        # Iterate through each line and process it
        for line in lines:
            # Call the main function for each line and get the results
            results = extract_non_japaneses(line)
            
            # Iterate through the results and write them to the result file
            for result in results:
                original_text, mecab_pro_str, kana_text, hiragana_text, is_same = result
                if is_same is None:
                    result_file.write(f"Non-Japanese: {original_text}\n")
                    output_file.write(f"None({original_text}) ")
                    fresult_file.write(f"{original_text} ")
                    numofnj += len(original_text)
                else:
                    if is_same:
                        result_file.write(f"The result is same! - Japanese: {original_text}, {mecab_pro_str}, {kana_text}, {hiragana_text}\n")
                        output_file.write(f"{hiragana_text} ")
                        fresult_file.write(f"{hiragana_text} ")
                        numofsame += len(original_text)
                    else:
                        result_file.write(f"The result is different! - Japanese: {original_text}, {mecab_pro_str}, {kana_text}, {hiragana_text}\n")
                        output_file.write(f"{hiragana_text}(diff) ")
                        fresult_file.write(f"{hiragana_text} ")
                        numofdiff += len(original_text)
            # Add an extra newline for spacing between entries
            output_file.write("\n")  # Add this line to ensure each result is on a new line
            fresult_file.write("\n")
    # Calculate total characters
    total_characters = numofsame + numofdiff + numofnj
    
    print(f"Total is {total_characters}")

    # Calculate CER (Character Error Rate)
    cer = ((numofdiff + numofnj) / total_characters) * 100 if total_characters > 0 else 0  # Avoid division by zero
    
    print(f"CER is {cer}%")
    # Return the CER value along with numofsame, numofdiff, numofnj
    return numofsame, numofdiff, numofnj, cer

# Input: path to the text file
file_path = './data/iryo_org/てんかん/京都祇園軽ワゴン車暴走事故.txt'
# file_path = './data/iryo_org/てんかん/大田原症候群.txt'
# file_path = './data/iryo_org/てんかん/日本てんかん学会.txt'
# file_path = './data/iryo_org/てんかん/池袋駅東口乗用車暴走事故.txt'
# file_path = './data/iryo_org/てんかん/鹿沼市クレーン車暴走事故.txt'
# file_path = './data/words.txt'

outfile_path = "./output.txt"
result_path = "./result.txt"
fresult_path = "./fresult.txt"

# Call the process_file function to process each line
numofsame, numofdiff, numofnj, cer = process_file(file_path, outfile_path, result_path, fresult_path)

print(f"Num of same is {numofsame}")
print(f"Num of diff is {numofdiff}")
print(f"Num of non japanese is {numofnj}")