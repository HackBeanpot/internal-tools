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

  const csvFileToArray = (string: any) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setCsvRowsArray(array);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (file) {
      reader.onload = function (event) {
        const csvOutput = event.target?.result;
        csvFileToArray(csvOutput);
      };

      reader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...csvRowsArray));

  interface CsvRow {
    email: string;
  }

  const re = /\${(.*?)}/g;

  interface ReplaceObj {
      toReplace: string;
      headerName: string;
  }

  const createRegexArray = () => {
    const messageStr = message.toString();
    const array = [...messageStr.matchAll(re)];
    const headersArr: Array<String> = [];
    const headersArrFinal: Array<ReplaceObj>  = [];
    for (let i = 0; i < array.length; i++) {
      const header = array[i][1];
      if (!headersArr.includes(header)) {
        headersArr.push(header);
        headersArrFinal.push({toReplace: array[i][0], headerName: array[i][1]});
      }
    }
    return headersArrFinal;
  };

  const createMessages = () => {
    for (let i = 0; i < csvRowsArray.length; i++) {
      const currRow: CsvRow = csvRowsArray[i];
      console.log(currRow);
      const to = currRow.email;
      createRegexArray();
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
        MESSAGE
        <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
        <br />
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
