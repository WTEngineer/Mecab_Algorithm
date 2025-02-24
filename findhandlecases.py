import re

def classify_match(match):
    # Get the matched text
    text = match.group(0)
    
    # Classify based on pattern
    if re.match(r"\d{4}年\d{1,2}月\d{1,2}日", text):  # Full date (e.g., 2013年9月10日)
        return 'Date'
    elif re.match(r"\d{4}年", text):  # Year (e.g., 2013年)
        return 'Year'
    elif re.match(r"\d{1,2}月", text):  # Month (e.g., 9月)
        return 'Month'
    elif re.match(r"\d{1,2}日", text):  # Day (e.g., 10日)
        return 'Day'
    elif re.match(r"\d+", text):  # Any number (e.g., 1234)
        return 'Number'
    elif re.match(r"[.,・;:!?()（）{}[\]<>\"'`~、。！；/～「」『』]", text):  # Special characters
        return 'Special Character'
    else:
        return 'Unknown'

# Function to find elements in the text (dates, numbers, punctuations) and classify them
def find_elements_in_text_with_classification(text):
    pattern = r"(\d{4}年\d{1,2}月\d{1,2}日|\d{4}年|\d{1,2}月 \d{1,2}日|\d{1,2}月|\d{1,2}日|\d+|[.,・;:!?()（）{}[\]<>\"'`~、。！；/～「」『』])"
    
    # Use re.finditer to get matches along with their positions
    matches = re.finditer(pattern, text)
    
    result = []
    last_end = 0  # Keep track of the last match's end position
    
    for match in matches:
        match_text = match.group(0)  # The matched text
        match_type = classify_match(match)  # Classify the match
        
        # Append non-matching text before the current match
        if match.start() > last_end:
            non_match_text = text[last_end:match.start()]  # Non-matching text
            result.append({'text': non_match_text, 'match': False, 'type': 'Non-matching'})
        
        # Append the matched text with its type
        result.append({'text': match_text, 'match': True, 'type': match_type})
        
        # Update last_end to the end position of the current match
        last_end = match.end()
    
    # Append any remaining non-matching text after the last match
    if last_end < len(text):
        result.append({'text': text[last_end:], 'match': False, 'type': 'Non-matching'})
    
    return result

# Dictionary to map numbers to Katakana
number_to_katakana = {
    0: "ゼロ", 1: "イチ", 2: "ニ", 3: "サン", 4: "シ", 5: "ゴ", 
    6: "ロク", 7: "シチ", 8: "ハチ", 9: "キュウ", 10: "ジュウ", 
    100: "ヒャク", 1000: "セン", 10000: "マン"
}

def number_to_katakana_converter(number):
    """Converts a number to Katakana."""
    if number == 0:
        return number_to_katakana[0]

    katakana = []
    
    # Process each digit of the number
    for digit in str(number):
        katakana.append(number_to_katakana[int(digit)])
    
    return ''.join(katakana)

def date_to_katakana(date):
    """Converts a date or its components (YYYY年, MM月, DD日) to Katakana."""
    
    # Full date format: YYYY年MM月DD日
    if "年" in date and "月" in date and "日" in date:
        parts = date.split('年')
        year = parts[0]
        
        month_day = parts[1].split('月')
        month = month_day[0]
        day = month_day[1].replace('日', '')

        # Convert each part to Katakana
        year_katakana = ''.join([number_to_katakana_converter(int(digit)) for digit in year])
        month_katakana = number_to_katakana_converter(int(month))
        day_katakana = number_to_katakana_converter(int(day))

        return f"{year_katakana}ネン{month_katakana}ガツ{day_katakana}ニチ"

    # Year-only format (YYYY年)
    elif "年" in date:
        year = date.replace('年', '')
        year_katakana = ''.join([number_to_katakana_converter(int(digit)) for digit in year])
        return f"{year_katakana}ネン"

    # Month-only format (MM月)
    elif "月" in date:
        month = date.replace('月', '')
        month_katakana = number_to_katakana_converter(int(month))
        return f"{month_katakana}ガツ"

    # Day-only format (DD日)
    elif "日" in date:
        day = date.replace('日', '')
        day_katakana = number_to_katakana_converter(int(day))
        return f"{day_katakana}ニチ"

    # If input does not match any expected date format, return it unchanged
    return date

def special_character_to_katakana(char):
    """Converts special characters to their Japanese Katakana equivalent."""
    special_char_map = {
        ",": "カンマ",
        ".": "ピリオド",
        "!": "エクスクラメーション",
        "?": "クエスチョン",
        ":": "コロン",
        ";": "セミコロン",
        "(": "カッコ",
        ")": "カッコトジ",
        "[": "ブラケット",
        "]": "ブラケット閉じ",
        "{": "ブレース",
        "}": "ブレース閉じ",
        "<": "レスザン",
        ">": "グレーターザン",
        "/": "スラッシュ",
        "\\": "バックスラッシュ",
        "-": "ハイフン",
        "_": "アンダーバー",
        "~": "チルダ",
        "\"": "ダブルクオート",
        "'": "シングルクオート",
        "「": "カギカッコ",
        "」": "カギカッコトジ",
        "『": "ニジュウカギカッコ",
        "』": "ニジュウカギカッコトジ",
        "・": "ナカグロ",
        "、": "テン",
        "。": "マル",
        "…": "リーダー",
        "ー": "チョウオン",
        "＝": "イコール",
        "＋": "プラス",
        "−": "マイナス",
        "×": "カケル",
        "÷": "ワル",
        "％": "パーセント",
        "&": "アンド",
        "@": "アットマーク",
        "#": "シャープ",
        "*": "アスタリスク",
        "^": "キャレット",
        "|": "パイプ",
        "￥": "エンマーク",
        "＄": "ドル",
    }
    
    # Return the Katakana equivalent if found, otherwise return the original character
    return special_char_map.get(char, char)
