#!/usr/bin/python
# -*- coding: utf-8 -*-

import MeCab
import sys
import string

# Define a function to read the text file content
def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return file.read().strip()

# Get the text file name from the command line argument
if len(sys.argv) < 2:
    print("Usage: python script.py <text_file>")
    sys.exit(1)

filename = sys.argv[1]

# Read the sentence from the text file
sentence = read_file(filename)

try:
    # Print MeCab version
    print(MeCab.VERSION)

    # Initialize MeCab with the sentence
    t = MeCab.Tagger(" ".join(sys.argv))

    # Parse the sentence and print the result
    print(t.parse(sentence).encode('utf-8', errors='replace').decode('utf-8'))

    m = t.parseToNode(sentence)
    while m:
        print(m.surface, "\t", m.feature)
        m = m.next
    print("EOS")

    # Parse the sentence with lattice representation
    lattice = MeCab.Lattice()
    t.parse(lattice)
    lattice.set_sentence(sentence)
    length = lattice.size()
    for i in range(length + 1):
        b = lattice.begin_nodes(i)
        e = lattice.end_nodes(i)
        while b:
            print("B[%d] %s\t%s" % (i, b.surface, b.feature))
            b = b.bnext 
        while e:
            print("E[%d] %s\t%s" % (i, e.surface, e.feature))
            e = e.bnext 
    print("EOS")

    # Print dictionary information
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

except RuntimeError as e:
    print("RuntimeError:", e)
