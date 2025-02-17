import re
from gpttokeniser.kakasitest import convert_text
from processmecab.extractpro import extract_pronunciation

# Function to check if a string contains Japanese characters (Hiragana, Katakana, Kanji)
def is_japanese(text):
    # Regex pattern to check if the text contains any Hiragana, Katakana, or Kanji characters
    japanese_pattern = r'[\u3040-\u30FF\u4E00-\u9FFF]'  # Hiragana, Katakana, and Kanji
    return bool(re.search(japanese_pattern, text))  # Returns True if Japanese characters are found

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

# Function to extract non-Japanese text, save the results to the output file, and return the data
def extract_non_japaneses(text):
    final_result = convert_text(text)
    
    # Create a list to store the results for later return
    results = []
    
    # Iterate through the final result and check if the original text is Japanese or non-Japanese
    for item in final_result:
        original_text = item['original']
        kana_text = item['kana']
        hiragana_text = item['hiragana']
        
        # Check if the original text is Japanese
        if is_japanese(original_text):
            mecab_pro = extract_pronunciation(original_text)
            
            # Join the mecab_pro list without spaces
            mecab_pro_str = ''.join(mecab_pro)  # Concatenate items of mecab_pro without spaces
            if mecab_pro_str == kana_text:
                # output_file.write(f"The result is same! - Japanese: {original_text}, {mecab_pro}, {kana_text}, {hiragana_text}\n")
                results.append((original_text, mecab_pro_str, kana_text, hiragana_text, True))
            else:
                # output_file.write(f"The result is different! - Japanese: {original_text}, {mecab_pro}, {kana_text}, {hiragana_text}\n")
                results.append((original_text, mecab_pro_str, kana_text, hiragana_text, False))
            
            # Add the results to the return list
            
        else:
            # output_file.write(f"Non-Japanese: {original_text}\n")
            
            # Add the results to the return list
            results.append((original_text, None, None, None, None))
    
    # print(f"Output file is saved successfully!")
    
    # Return the collected results
    return results
    
    # # Extract non-Japanese characters
    # non_japanese_chars = extract_non_japanese_characters(text)

    # # Categorize the characters
    # numbers, english_letters, punctuation, others = categorize_characters(non_japanese_chars)

    # # Extract dates from the text
    # dates = extract_dates(text)

    # Print the results
    # print_categorized_results(numbers, english_letters, punctuation, others, dates)
