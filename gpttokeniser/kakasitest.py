import pykakasi
kks = pykakasi.kakasi()
text = "高血圧"
result = kks.convert(text)
for item in result:
    print("{}: kana '{}', hiragana '{}', romaji: '{}'".format(item['orig'], item['kana'], item['hira'], item['hepburn']))