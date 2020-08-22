import React, { useState, useContext } from "react";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import PublishIcon from "@material-ui/icons/Publish";
import { store } from "../store";
import { Box, Typography, Button } from "@material-ui/core";
import "./styles.css";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [disable, setDisable] = useState(false);
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const handleChange = (e) => {
    if (e.target.files[0] === undefined) {
      return;
    }
    if (e.target.files[0].type !== "application/pdf") {
      alert("Only PDF file allowed!");
      return;
    }

    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (file === null) {
      alert("Please Select a file.");
      return;
    }
    setDisable(true);
    dispatch({ type: "START_PARSING" });
    let data = new FormData();
    data.append("resume", file, fileName);
    let res = await fetch("/api/parse", {
      method: "post",
      body: data,
    });
    let result = await res.json();
    dispatch({ type: "RESUME_PARSED", payload: result });
    setFile(null);
    setDisable(false);
    setFileName(null);
  };

  return (
    <Box my="6rem">
      <Typography
        color="textSecondary"
        align="center"
        gutterBottom
        variant="h5"
      >
        Resume Parser
      </Typography>
      <form onSubmit={submit} align="center">
        <Box component="div" my="1rem" className="upload-btn-wrapper">
          <Button variant="outlined" color="primary">
            <CloudUploadOutlinedIcon fontSize="large" /> &nbsp;&nbsp;Select
            Resume
          </Button>
          <input
            onChange={handleChange}
            accept="application/pdf"
            type="file"
            name="myfile"
          />
          <br />
          {fileName ? (
            <Typography variant="overline" gutterBottom>
              {fileName}
            </Typography>
          ) : null}
        </Box>
        <br />
        <Button
          disabled={disable}
          type="submit"
          color="primary"
          variant="outlined"
        >
          <PublishIcon /> Send
        </Button>
      </form>
    </Box>
  );
};

export default FileUpload;
