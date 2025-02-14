import tiktoken
enc = tiktoken.get_encoding("o200k_base")

print(enc.encode("高血圧"))

print(enc.decode([5319, 37333, 1556, 100]))

print([enc.decode_single_token_bytes(token) for token in [5319, 37333, 1556, 100]])
