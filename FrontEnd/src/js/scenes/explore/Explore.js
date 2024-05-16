// ExplorePage.js
import React, { useState } from "react";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Explore.scss";
import dataResp from "../../../data.json";
import {
  getNERAction,
  setInputData,
  setResponseData,
} from "../../redux/actions/dataActions";

function ExplorePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = ["text/plain", "application/pdf"];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setText("");
      setError("");
    } else {
      setFile(null);
      setError("Please select a valid file type (text or PDF)");
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim() && !file) {
      setError("Please upload a file or paste some text");
      return;
    }

    // Handle the submitted text or file (e.g., send it to the backend for processing)
    console.log("Submitted text:", text);
    console.log("Submitted file:", file);
    const nerPayload = { text: text };
    dispatch(setInputData(text));
    getNERAction(dispatch, nerPayload);
    // dispatch(setResponseData(dataResp.response)); //this is mock data
    navigate("/display");
  };

  return (
    <div className="explore-page">
      <header>
        <h1>Explore Bengali Copilot</h1>
        <p>Unlock the power of AI for Bengali language tasks</p>
      </header>
      <main>
        <section className="upload-form">
          <h2>Upload Text or PDF</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <input type="file" id="file" onChange={handleFileChange} /> */}
              <Tooltip title="This feature will come soon.">
                <label className="file-label" htmlFor="file">
                  Upload File
                </label>
              </Tooltip>
            </div>
            <div className="form-group">
              <textarea
                placeholder="Paste your text here..."
                value={text}
                onChange={handleTextChange}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ExplorePage;
