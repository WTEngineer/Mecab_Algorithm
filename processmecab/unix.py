import MeCab
import sys
import os

# This will be used elsewhere to initialize the tagger
DICDIR = os.path.join("/home/good/Documents/Mecub/Mecab_Algorithm/dic", "mecab-ipadic-neologd")

# mecabrc = os.path.join(DICDIR, 'mecabrc')
# MECAB_ARGS = '-r "{}" -d "{}"'.format(mecabrc, DICDIR)
dicrc = os.path.join(DICDIR, 'dicrc')
MECAB_ARGS = '-r "{}" -d "{}"'.format(dicrc, DICDIR)

def extract_pronunciation(sentence):
    # Create a MeCab Tagger
    t = MeCab.Tagger(MECAB_ARGS)
    # t = MeCab.Tagger()

    # Parse the sentence and get the result in nodes
    m = t.parseToNode(sentence)
    
    pronunciations = []  # List to store pronunciations
    
    while m:
        # Split the feature string by commas
        features = m.feature.split(',')
        
        # The pronunciation is typically the 7th element in the feature list (index 7)
        # print(features)
        # if the dic is unidic-lite
        # pronunciation = features[6] if len(features) > 6 else None
        # if the dic is ipadic
        pronunciation = features[7] if len(features) > 7 else None
        
        # Only add to the list if pronunciation is valid and not '*'
        if pronunciation and pronunciation != "*":
            pronunciations.append(pronunciation)
        
        m = m.next  # Move to the next node
    d = t.dictionary_info()
    while d:
        print("filename: %s" % d.filename)
        print("charset: %s" %  d.charset)
        print("size: %d" %  d.size)
        print("type: %d" %  d.type)
        print("lsize: %d" %  d.lsize)
        print("rsize: %d" %  d.rsize)
        print("version: %d" %  d.version)
        d = d.next
    return pronunciations