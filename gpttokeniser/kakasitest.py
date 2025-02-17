import pykakasi

# Function to convert text and return the final result
def convert_text(text):
    kks = pykakasi.kakasi()  # Initialize the pykakasi converter
    result = kks.convert(text)  # Convert the text
    
    # Prepare the final formatted result (you can return it as a list or formatted string)
    final_result = []
    for item in result:
        final_result.append({
            'original': item['orig'],
            'kana': item['kana'],
            'hiragana': item['hira'],
            'romaji': item['hepburn']
        })
    
    return final_result  # Return the list of results