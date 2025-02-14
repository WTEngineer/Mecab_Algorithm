import MeCab
tagger = MeCab.Tagger()
print(tagger.parse("pythonが大好きです"))