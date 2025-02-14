import MeCab

# Initialize the MeCab Tagger with options to return readings
tagger = MeCab.Tagger("-O unidic")

# Parse the input and get the reading
result = tagger.parse("高血圧")

# Output the result
print(result)