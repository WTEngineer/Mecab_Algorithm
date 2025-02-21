import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React, { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios"; // Import axios

function Home({ route }) {
  const fileInputRef = useRef(null);
  const [inputContent, setInputContent] = useState("");
  const [parsedResult, setParsedResult] = useState(""); // For MeCab parsed results
  const [openaiResult, setOpenaiResult] = useState(null); // For OpenAI API response

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        console.log("File content:", content);
        setInputContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Function to fetch MeCab result from the API
  const fetchMeCabResult = async (sentence) => {
    try {
      const response = await axios.post("http://localhost:5001/parse", {
        sentence,
      });
      console.log(response.data);
      const realdata = response.data.nodes;
      if (response.data.nodes.length > 2) {
        realdata.pop();
        realdata.shift();
      }
      let lineindex = 0;
      let subnodes = [];
      let subnodessurface = "";
      let subnodeseightfeature = "";
      let totalnodes = [];
      for (let i = 0; i < realdata.length; i++) {
        if (realdata[i].surface === "\r") {
          for (let j = lineindex; j < i; j++) {
            subnodes.push(realdata[j]);
            subnodessurface += realdata[j].surface;
            subnodeseightfeature +=
              realdata[j].eighth_feature === null
                ? realdata[j].surface
                : realdata[j].eighth_feature;
          }
          lineindex = i + 1;
          totalnodes.push(
            (subnodes = {
              surface: subnodessurface,
              eighth_feature: subnodeseightfeature,
            })
          );
          subnodes = [];
          subnodessurface = "";
          subnodeseightfeature = "";
        }
      }
      for (let i = lineindex; i < realdata.length; i++) {
        subnodes.push(realdata[i]);
        subnodessurface += realdata[i].surface;
        subnodeseightfeature +=
          realdata[i].eighth_feature === null
            ? realdata[i].surface
            : realdata[i].eighth_feature;
      }
      totalnodes.push({
        surface: subnodessurface,
        eighth_feature: subnodeseightfeature,
      });
      console.log(totalnodes);
      // Set the parsed result from the API response into state
      setParsedResult(totalnodes);
    } catch (error) {
      console.error("Error fetching MeCab result:", error);
    }
  };

  // Function to upload the file to the /process API
  const fetchOpenAIResult = async () => {
    const formData = new FormData();
    formData.append(
      "input_file",
      new Blob([inputContent], { type: "text/plain" }),
      "input_file.txt"
    );

    try {
      const response = await axios.post(
        "http://localhost:5001/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Store the OpenAI API result in state
      setOpenaiResult(response.data);
    } catch (error) {
      console.error("Error fetching OpenAI result:", error);
    }
  };

  return (
    <div className="Home">
      <Typography variant="h3">Correct Answer Selecting Tool!</Typography>
      <Container style={{ marginLeft: "0px" }}>
        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={handleButtonClick}
        >
          Select input file.
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={() => fetchMeCabResult(inputContent)}
        >
          Fetch MeCab Result
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
          onClick={fetchOpenAIResult}
        >
          Fetch OpenAI Result
        </Button>
        <Button variant="contained" color="primary" style={{ margin: "10px" }}>
          Save result file
        </Button>
      </Container>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Container
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Typography variant="h6">MeCab Parsed Result:</Typography>
          {parsedResult &&
            parsedResult.map((node, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  height: "auto",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography key={index} color="primary">
                    {node.surface}
                  </Typography>
                  <Typography key={`${index}-${index}`}>
                    {node.eighth_feature}
                  </Typography>
                </div>
                {/* <TextField id="standard-basic" label="Standard" /> */}
              </div>
            ))}
        </Container>
        <Container
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Typography variant="h6">OpenAI Response:</Typography>
          {openaiResult &&
            openaiResult.output.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  height: "auto",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography key={index} color="primary">
                    {item[0]}
                  </Typography>
                  <Typography key={`${index}-${index}`}>{item[1]}</Typography>
                </div>
                {/* <TextField id="standard-basic" label="Standard" /> */}
              </div>
            ))}
        </Container>
        {/* <Container>
          {openaiResult && (
            <>
              <Typography variant="h6">OpenAI Response:</Typography>
              <Paper style={{ padding: "10px", margin: "10px" }}>
                <Typography variant="body1">
                  Request ID: {openaiResult.request_id}
                </Typography>
                <Typography variant="body1">
                  Tokens Used: {openaiResult.n_tokens.total}
                </Typography>
                <div>
                  Output:{" "}
                  {openaiResult.output.map((item, index) => (
                    <div key={index}>
                      <Typography variant="body1">{item[0]}</Typography>
                      <Typography variant="body2">{item[1]}</Typography>
                    </div>
                  ))}
                </div>
              </Paper>
            </>
          )}
        </Container> */}
      </div>
    </div>
  );
}

export default Home;
