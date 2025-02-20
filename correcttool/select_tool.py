import os
import csv
import tkinter as tk
from tkinter import simpledialog, messagebox, filedialog, scrolledtext
from argparse import ArgumentParser
from datetime import datetime
from openai import AzureOpenAI
from dotenv import load_dotenv

# Load environment variables for OpenAI
load_dotenv()

CLIENT = AzureOpenAI(
    api_version=os.getenv('AZURE_OPENAI_API_VERSION', ''),
    azure_endpoint=os.getenv('AZURE_OPENAI_ENDPOINT', ''),
    api_key=os.getenv('AZURE_OPENAI_API_KEY', ''),
)

PJ_ID = 'Shourei_Imai'


def ask_for_answer_gui(source_word, mecab_candidate, gpt_candidate):
    answer = simpledialog.askstring("Answer Selection",
                                    f"Source Word: {source_word}\n\n1. MeCab: {mecab_candidate}\n2. GPT: {gpt_candidate}\n\nEnter the correct answer (1/2 or custom):")
    if answer == '1':
        return mecab_candidate
    elif answer == '2':
        return gpt_candidate
    else:
        return answer


def save_to_csv_gui(results, filename="./output.csv"):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(["Source Word", "Correct Answer"])
        for source_word, correct_answer in results:
            writer.writerow([source_word, correct_answer])


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
        messages = [{'role': 'user', 'content': prompt}]
        res = CLIENT.chat.completions.create(
            messages=messages,
            model="default-4o",
            max_tokens=4000,
            top_p=1,  # Reproducible output
            temperature=0,  # Less randomness
            frequency_penalty=0,
            presence_penalty=0,
            stop=None,
        )
        usage = res.usage
        choice = res.choices[0]
        content = choice.message.content
        output['output'] += content
        output['n_tokens']['prompt'] += usage.prompt_tokens
        output['n_tokens']['output'] += usage.completion_tokens
        output['n_tokens']['total'] += usage.total_tokens
        return output
    except Exception as err:
        output['output'] = f'Error: {err}'
        return output


def generate_prompt_list(prompt_file, input_file):
    # Open and read the prompt and input files
    with open(prompt_file, 'r', encoding='utf-8') as fp:
        user_prompt = fp.read()
    with open(input_file, "r", encoding='utf-8') as f:
        text = f.read()
    prompt_list = user_prompt + "\n" + text
    return prompt_list


def start_gui():
    # Create the Tkinter root window
    root = tk.Tk()
    root.title("Context and Answer Selection Viewer")

    # Set the layout with grid and fixed width for both first and second parts
    root.columnconfigure(0, weight=0, minsize=500)  # Left column with fixed width (500px)
    root.columnconfigure(1, weight=0, minsize=500)  # Right column with fixed width (500px)
    root.rowconfigure(0, weight=1)
    root.rowconfigure(1, weight=2)
    root.rowconfigure(2, weight=2)
    root.rowconfigure(3, weight=1)

    # Frame 1: Prompt Content (Top Left)
    prompt_frame = tk.Frame(root)  # Let the frame resize according to grid
    prompt_frame.grid(row=0, column=0, padx=10, pady=10, sticky="nsew")
    
    prompt_text = scrolledtext.ScrolledText(prompt_frame, width=50, height=10, wrap=tk.WORD)
    prompt_text.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)
    
    # Frame 2: Input Content (Top Right)
    input_frame = tk.Frame(root)  # Let the frame resize according to grid
    input_frame.grid(row=0, column=1, padx=10, pady=10, sticky="nsew")
    
    input_text = scrolledtext.ScrolledText(input_frame, width=50, height=10, wrap=tk.WORD)
    input_text.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

    # Frame 3: Answer Selection (Bottom Left)
    answer_frame = tk.Frame(root)
    answer_frame.grid(row=1, column=0, padx=10, pady=10, sticky="nsew")
    
    # Use file dialogs to select the prompt and input files
    prompt_file = filedialog.askopenfilename(
        title="Select the prompt file",
        filetypes=[("Text files", "*.txt"), ("All files", "*.*")]
    )
    if not prompt_file:
        messagebox.showerror("Error", "No prompt file selected. Exiting.")
        return

    input_file = filedialog.askopenfilename(
        title="Select the input file",
        filetypes=[("Text files", "*.txt"), ("All files", "*.*")]
    )
    if not input_file:
        messagebox.showerror("Error", "No input file selected. Exiting.")
        return

    # Display the contents of the selected files in the text widgets
    with open(prompt_file, 'r', encoding='utf-8') as fp:
        prompt_content = fp.read()
    with open(input_file, 'r', encoding='utf-8') as f:
        input_content = f.read()

    prompt_text.insert(tk.END, "Prompt File Content:\n")
    prompt_text.insert(tk.END, prompt_content + "\n\n")
    input_text.insert(tk.END, "Input File Content:\n")
    input_text.insert(tk.END, input_content)

    # Process OpenAI request
    prompt_list = generate_prompt_list(prompt_file, input_file)
    res = request_openai(f'{PJ_ID}_{input_file}', prompt_list)

    source_group = ["高血圧", "糖尿病", "プログラミング"]  # Example list, could be dynamically parsed from res['output']
    mecab_answers = ["コウケツアツ", "トウニョウビョウ", "プログラミング"]  # MeCab answer candidates
    gpt_answers = res['output'].split("\n")  # Assume OpenAI response has candidate answers per line

    results = []

    # Display answer selection widgets
    for i, (source_word, mecab_candidate, gpt_candidate) in enumerate(zip(source_group, mecab_answers, gpt_answers)):
        label = tk.Label(answer_frame, text=f"{source_word}:")
        label.grid(row=i, column=0, padx=10, pady=5, sticky="w")

        # Create radio buttons for each candidate
        var = tk.StringVar(value="optional")  # Default value is 'optional'
        mecab_radio = tk.Radiobutton(answer_frame, text=f"MeCab: {mecab_candidate}", variable=var, value="MeCab", anchor="w", command=lambda: update_input(mecab_candidate))
        mecab_radio.grid(row=i, column=1, padx=10, pady=5, sticky="w")
        gpt_radio = tk.Radiobutton(answer_frame, text=f"GPT: {gpt_candidate}", variable=var, value="GPT", anchor="w", command=lambda: update_input(gpt_candidate))
        gpt_radio.grid(row=i, column=2, padx=10, pady=5, sticky="w")

        # Create an input box for optional input (with default focus)
        optional_input = tk.Entry(answer_frame)
        optional_input.grid(row=i, column=3, padx=10, pady=5)
        optional_input.focus()

        # Display the candidate context in a 100px text area
        candidate_context = scrolledtext.ScrolledText(answer_frame, width=12, height=3, wrap=tk.WORD)
        candidate_context.insert(tk.END, f"MeCab: {mecab_candidate}\nGPT: {gpt_candidate}")
        candidate_context.grid(row=i, column=4, padx=10, pady=5, sticky="w")

        # Function to update the input box with the candidate's content
        def update_input(candidate):
            optional_input.delete(0, tk.END)
            optional_input.insert(0, candidate)

        # Save the answer selection
        def on_select_answer():
            correct_answer = var.get() if var.get() != "optional" else optional_input.get()
            results.append((source_word, correct_answer))

    # Frame 4: Save Results Button (Bottom Right)
    save_button_frame = tk.Frame(root)
    save_button_frame.grid(row=2, column=1, padx=10, pady=10, sticky="se")

    def save_results():
        save_to_csv_gui(results)
        messagebox.showinfo("Complete", "Results have been saved to 'output.csv'.")

    save_button = tk.Button(save_button_frame, text="Save Results", command=save_results)
    save_button.pack(pady=10)

    root.mainloop()


if __name__ == "__main__":
    start_gui()
