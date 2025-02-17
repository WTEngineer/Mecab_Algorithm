def read_file_by_lines(file_path):
    lines = []  # List to store the lines
    try:
        # Open the file in read mode
        with open(file_path, 'r', encoding='utf-8') as file:
            # Read each line and add it to the list
            for line in file:
                lines.append(line.strip())  # strip() removes leading/trailing whitespace
    except FileNotFoundError:
        print(f"The file at {file_path} was not found.")
    except Exception as e:
        print(f"An error occurred: {e}")
    
    return lines  # Return the list of lines
