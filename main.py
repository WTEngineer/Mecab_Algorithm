from propre.preprocess import extract_non_japaneses
from propre.readfilebylines import read_file_by_lines

# Function to process the file line by line and handle output saving
def process_file(file_path, outfile_path, fresultfile_path):
    # Open the output file in append mode, so we don't overwrite existing content
    with open(outfile_path, 'w', encoding='utf-8') as output_file, open(fresultfile_path, 'w', encoding='utf-8') as result_file:
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
                else:
                    if is_same:
                        result_file.write(f"The result is same! - Japanese: {original_text}, {mecab_pro_str}, {kana_text}, {hiragana_text}\n")
                        output_file.write(f"{hiragana_text} ")
                    else:
                        result_file.write(f"The result is different! - Japanese: {original_text}, {mecab_pro_str}, {kana_text}, {hiragana_text}\n")
                        output_file.write(f"{hiragana_text}(diff) ")
            # Add an extra newline for spacing between entries
            output_file.write("\n")  # Add this line to ensure each result is on a new line

# Input: path to the text file
file_path = './data/iryo_org/てんかん/京都祇園軽ワゴン車暴走事故.txt'
outfile_path = "./output.txt"
fresultfile_path = "./result.txt"

# Call the process_file function to process each line
process_file(file_path, outfile_path, fresultfile_path)
