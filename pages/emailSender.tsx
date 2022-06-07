import { ThemeProvider, Divider, Typography, Container } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { theme } from "../styles/theme";

const EmailSender: NextPage = () => {
  const [file, setFile] = useState();
  const fileReader = new FileReader();
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        console.log(csvOutput);
      };

      fileReader.readAsText(file);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Email Sender </Typography>
        <Divider />
        <br />
      </Container>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </ThemeProvider>
  );
};

export default EmailSender;
