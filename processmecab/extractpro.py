import MeCab
import sys

def extract_pronunciation(sentence):
    # Create a MeCab Tagger
    t = MeCab.Tagger()

    # Parse the sentence and get the result in nodes
    m = t.parseToNode(sentence)
    
    pronunciations = []  # List to store pronunciations
    
    while m:
        # Split the feature string by commas
        features = m.feature.split(',')
        
        # The pronunciation is typically the 7th element in the feature list (index 7)
        pronunciation = features[6] if len(features) > 6 else None
        
        # Only add to the list if pronunciation is valid and not '*'
        if pronunciation and pronunciation != "*":
            pronunciations.append(pronunciation)
        
        m = m.next  # Move to the next node
    
    return pronunciations