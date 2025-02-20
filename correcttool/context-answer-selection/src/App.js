import React, { useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios"; // Import axios
import "./App.css";

const App = () => {
  const [results, setResults] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [optionalInput, setOptionalInput] = useState("");
  const [candidateContext, setCandidateContext] = useState("");
  const [promptContent, setPromptContent] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [parsedResult, setParsedResult] = useState(""); // State to store the parsed result

  // Sample data (replace with actual API data or dynamic data)
  const sourceGroup = ["高血圧", "糖尿病", "プログラミング"];
  const mecabAnswers = ["コウケツアツ", "トウニョウビョウ", "プログラミング"];
  const gptAnswers = [
    "MeCab: コウケツアツ | GPT: 高血圧",
    "MeCab: トウニョウビョウ | GPT: 糖尿病",
    "MeCab: プログラミング | GPT: プログラミング",
  ];

  // Handle the file selection for prompt and input files
  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "prompt") {
          setPromptContent(reader.result);
        } else if (type === "input") {
          setInputContent(reader.result);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleRadioChange = (selected, context) => {
    setSelectedAnswer(selected);
    setCandidateContext(context);
    setOptionalInput(""); // Clear optional input when a radio button is selected
  };

  const handleInputChange = (e) => {
    setOptionalInput(e.target.value);
  };

  const handleSave = () => {
    const updatedResults = [
      ...results,
      {
        sourceWord: sourceGroup,
        correctAnswer: selectedAnswer || optionalInput,
      },
    ];
    setResults(updatedResults);
  };

  // Function to fetch MeCab result from the API
  const fetchMeCabResult = async (sentence) => {
    console.log(sentence);
    try {
      const response = await axios.post("http://localhost:5001/parse", {
        sentence,
      });
      console.log(response.data);
      // Set the parsed result from the API response into state
      setParsedResult(response.data.parsed_result);
    } catch (error) {
      console.error("Error fetching MeCab result:", error);
    }
  };

  return (
    <div className="app">
      <div className="content-container">
        {/* Prompt Content */}
        <div className="prompt-content">
          <h2>Prompt File Content:</h2>
          <textarea value={promptContent} readOnly />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileChange(e, "prompt")}
          />
        </div>

        {/* Input Content */}
        <div className="input-content">
          <h2>Input File Content:</h2>
          <textarea value={inputContent} readOnly />
          <input
            type="file"
            accept=".txt"
            onChange={(e) => handleFileChange(e, "input")}
          />
        </div>
      </div>

      {/* Answer Selection */}
      <div className="answer-selection">
        <h2>Select the Correct Answer:</h2>
        {sourceGroup.map((sourceWord, index) => (
          <div key={index}>
            <p>{sourceWord}:</p>

            {/* Radio Buttons for MeCab and GPT */}
            <div>
              <input
                type="radio"
                name={`answer-${index}`}
                value="MeCab"
                checked={selectedAnswer === "MeCab"}
                onChange={() => handleRadioChange("MeCab", mecabAnswers[index])}
              />
              MeCab: {mecabAnswers[index]}
              <input
                type="radio"
                name={`answer-${index}`}
                value="GPT"
                checked={selectedAnswer === "GPT"}
                onChange={() => handleRadioChange("GPT", gptAnswers[index])}
              />
              GPT: {gptAnswers[index]}
            </div>

            {/* Optional Input */}
            <input
              type="text"
              placeholder="Optional answer"
              value={optionalInput}
              onChange={handleInputChange}
              disabled={selectedAnswer !== null} // Disable input if radio button is selected
            />
            <div>
              <h3>Candidate Context:</h3>
              <textarea value={candidateContext} readOnly />
            </div>
          </div>
        ))}
      </div>

      {/* Show MeCab Parsed Result in Textbox */}
      <div className="parsed-result">
        <h3>MeCab Parsed Result:</h3>
        <textarea value={parsedResult} readOnly />
      </div>

      {/* Save Results Button */}
      <div className="save-button">
        <button onClick={handleSave}>Save Answer</button>
        <CSVLink
          data={results}
          headers={[
            { label: "Source Word", key: "sourceWord" },
            { label: "Correct Answer", key: "correctAnswer" },
          ]}
          filename="results.csv"
        >
          <button>Download CSV</button>
        </CSVLink>
      </div>

      {/* Button to trigger the MeCab API fetch */}
      <div className="fetch-button">
        <button onClick={() => fetchMeCabResult(inputContent)}>
          Fetch MeCab Result
        </button>
      </div>
    </div>
  );
};

export default App;
