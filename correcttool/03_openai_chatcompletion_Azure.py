import os
from argparse import ArgumentParser
from datetime import datetime

import pandas as pd
from dotenv import load_dotenv
from openai import AzureOpenAI
from tqdm import tqdm

import pdb
st=pdb.set_trace

load_dotenv()

CLIENT = AzureOpenAI(
    api_version=os.getenv('AZURE_OPENAI_API_VERSION', ''),
    azure_endpoint=os.getenv('AZURE_OPENAI_ENDPOINT', ''),
    api_key=os.getenv('AZURE_OPENAI_API_KEY', ''),
)

PJ_ID = 'Shourei_Imai'


def parse_args():
    parser = ArgumentParser()
    parser.add_argument('user_prompt_txt')
    parser.add_argument('input_file')
    parser.add_argument('-o', '--out-dir', default='data/auto_shinsatsu/')
    parser.add_argument('-r', '--n-max-request', type=int, default=2)
    parser.add_argument('-w', '--n-max-word-per-request', type=int, default=100)
    return parser.parse_args()


def request_openai(request_id, prompt):
    output = {'request_id': request_id, 'output': '', 'n_tokens': {'prompt': 0, 'output': 0, 'total': 0}}
    try:
        reason = 'length'  # 初回用ダミー値
        n_reqs = 0
        messages = [{'role': 'user', 'content': prompt}]
        while n_reqs < 5 and reason == 'length':
            res = CLIENT.chat.completions.create(
                messages=messages,
                model="default-4o",
                max_tokens=4000,
                top_p=1,  # ランダム性を排除して再現性重視の出力とする設定
                temperature=0,  # ランダム性を排除して再現性重視の出力とする設定
                frequency_penalty=0,
                presence_penalty=0,
                stop=None,
            )
            usage = res.usage
            choice = res.choices[0]
            reason = choice.finish_reason
            content = choice.message.content
            output['output'] += content
            output['n_tokens']['prompt'] += usage.prompt_tokens
            output['n_tokens']['output'] += usage.completion_tokens
            output['n_tokens']['total'] += usage.total_tokens
            n_reqs += 1
            if reason == 'length':
                messages.append({'role': 'assistant', 'content': content})
        return output
    except Exception as err:
        import traceback
        traceback.print_exc()
        output['output'] = f'Error: {err}'
        return output


def generate_prompt_list(args):
    # ユーザプロンプトのロード
    with open(args.user_prompt_txt, 'r', encoding='utf-8') as fp:
        user_prompt = fp.read()
    # 単語リストのロード
    with open(args.input_file, "r", encoding='utf-8') as f: 
        text = f.read()
    #
    prompt_list = user_prompt + "\n" + text

    return prompt_list


def main(args):
    # 出力先フォルダを作成
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    out_dir = os.path.join(args.out_dir, ts)
    os.makedirs(out_dir, exist_ok=True)
    # 本処理
    prompt_list = generate_prompt_list(args)
    name = os.path.basename(args.input_file)
    #st()
    info = {'n_tokens': {'prompt': 0, 'output': 0, 'total': 0}}
    req_id = f'{PJ_ID}_{name}'.replace(".txt","")
    res = request_openai(req_id, prompt_list)
    with open(os.path.join(out_dir, req_id + '.txt'), 'w', encoding='utf-8') as fp:
        # print(res['output'])
        fp.write(res['output'])
    # トークン情報の出力
    info['n_tokens']['prompt'] += res['n_tokens']['prompt']
    info['n_tokens']['output'] += res['n_tokens']['output']
    info['n_tokens']['total'] += res['n_tokens']['total']
    print('n_tokens:', '\t'.join(map(str, [
        res['n_tokens']['prompt'],
        res['n_tokens']['output'],
        res['n_tokens']['total'],
        info['n_tokens']['prompt'],
        info['n_tokens']['output'],
        info['n_tokens']['total']]
    )), flush=True)


if __name__ == "__main__":
    main(parse_args())
