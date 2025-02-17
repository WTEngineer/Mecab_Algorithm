from propre.preprocess import extract_non_japaneses
from propre.readfilebylines import read_file_by_lines
# from gpttokeniser.kakasitest import convert_text

# Function to process the file line by line
def process_file(file_path):
    # Read the file lines using the read_file_by_lines function
    lines = read_file_by_lines(file_path)
    
    # Iterate through each line and process it
    for line in lines:
        print(line)
        extract_non_japaneses(line)  # Call the main function for each line

# Input: path to the text file
file_path = './data/words.txt'

# Call the process_file function to process each line
process_file(file_path)