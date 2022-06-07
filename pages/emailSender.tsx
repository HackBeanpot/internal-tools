import { ThemeProvider, Divider, Typography, Container } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { theme } from "../styles/theme";

const EmailSender: NextPage = () => {
  const [file, setFile] = useState();
  const [csvRowsArray, setCsvRowsArray] = useState([]);
  const [message, setMessage] = useState("");
  const [finalMessages, setFinalMessages] = useState([]);
  if (typeof window !== "undefined") {
    var reader = new window.FileReader();
  }
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setCsvRowsArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      reader.onload = function (event) {
        const csvOutput = event.target.result;
        csvFileToArray(csvOutput);
      };

      reader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...csvRowsArray));

  interface CsvRow {
      email: string;
  }

  const createMessages = () => {
      for (let i = 0; i < csvRowsArray.length; i++) {
          const currRow: CsvRow = csvRowsArray[i];
          console.log(currRow);
          const to = currRow.email;
      }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Email Sender </Typography>
        <Divider />
        <br />
      </Container>
      <form>
          MESSAGE
          <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
          <br/>
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
      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {csvRowsArray.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button onClick={createMessages}>Print final messages</button>
    </ThemeProvider>
  );
};

export default EmailSender;
