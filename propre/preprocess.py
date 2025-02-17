import re
from gpttokeniser.kakasitest import convert_text

# Function to extract non-Japanese characters
def extract_non_japanese_characters(text):
    # Regex pattern for extracting non-Japanese characters (exclude Kanji, Hiragana, Katakana)
    pattern = r'[^\u3040-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF一-龯々〆〤]+'  # Matches non-Japanese characters
    return re.findall(pattern, text)

# Function to categorize characters
def categorize_characters(non_japanese_chars):
    numbers = []
    english_letters = []
    punctuation = []
    others = []

    # Define regex patterns for different categories
    number_pattern = r'\d'  # Matches digits
    english_pattern = r'[a-zA-Z]'  # Matches English letters
    punctuation_pattern = r'[^\w\s\u3040-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF一-龯々〆〤\d]'  # Matches punctuation marks excluding digits

    # Iterate over each non-Japanese character and categorize it
    for char in non_japanese_chars:
        if re.match(number_pattern, char):
            numbers.append(char)
        elif re.match(english_pattern, char):
            english_letters.append(char)
        elif re.match(punctuation_pattern, char):
            punctuation.append(char)
        else:
            others.append(char)

    return numbers, english_letters, punctuation, others

# Function to extract dates from text (including full date with day)
def extract_dates(text):
    # Regex pattern to match dates in the format of "YYYY年MM月DD日", "YYYY年MM月", or "YYYY年"
    date_pattern = r'\d{4}年\d{1,2}月\d{1,2}日|\d{4}年\d{1,2}月|\d{4}年'  # Matches "YYYY年MM月DD日", "YYYY年MM月", "YYYY年"
    return re.findall(date_pattern, text)

# Function to print categorized results
def print_categorized_results(numbers, english_letters, punctuation, others, dates):
    print("Numbers:", numbers)
    print("English Letters:", english_letters)
    print("Punctuation Marks:", punctuation)
    print("Other Non-Japanese Characters:", others)
    print("Dates Found:", dates)

# Main function to coordinate the process
def extract_non_japaneses(text):
    final_result = convert_text(text)
    print(final_result)
    
    # Extract non-Japanese characters
    non_japanese_chars = extract_non_japanese_characters(text)

    # Categorize the characters
    numbers, english_letters, punctuation, others = categorize_characters(non_japanese_chars)

    # Extract dates from the text
    dates = extract_dates(text)

    # Print the results
    # print_categorized_results(numbers, english_letters, punctuation, others, dates)
