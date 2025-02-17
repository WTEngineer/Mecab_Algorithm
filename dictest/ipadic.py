import MeCab
import ipadic
import os
import sys

def get_version(dicdir):
    vpath = os.path.join(dicdir, 'version')
    with open(vpath) as vfile:
        return vfile.read().strip()

_curdir = os.path.dirname(__file__)

# This will be used elsewhere to initialize the tagger
DICDIR = os.path.join(_curdir, 'dicdir')
VERSION = get_version(DICDIR)

mecabrc = os.path.join(DICDIR, 'mecabrc')
MECAB_ARGS = '-r "{}" -d "{}"'.format(mecabrc, DICDIR)

tagger = MeCab.Tagger(MECAB_ARGS)
print(tagger.parse("カテゴリ: 1967年設立の組織, すべてのスタブ記事, てんかん, 一般社団法人 (学術団体), 医学関連のスタブ項目, 小平市の一般社団法人, 特筆性の基準を満たしていないおそれのある記事/2015年8月"))