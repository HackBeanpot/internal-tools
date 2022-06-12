import {
  ThemeProvider,
  Divider,
  Typography,
  Container,
  Button,
  FormControl,
  TextareaAutosize,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { style } from "@mui/system";

const EmailSender: NextPage = () => {
  const [file, setFile] = useState();
  const [csvRowsArray, setCsvRowsArray] = useState([]);
  const [message, setMessage] = useState("");
  const [finalMessages, setFinalMessages] = useState<Message[]>([]);
  const theme = useTheme();

  if (typeof window !== "undefined") {
    var reader = new window.FileReader();
  }
  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (str: any) => {
    const csvHeader = str.slice(0, str.indexOf("\n")).split(",");
    const csvRows = str.slice(str.indexOf("\n") + 1).split("\n");

    let array = csvRows.map((i) => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    if (array[array.length -1].email === "" ) {
      array.pop()
    }

    setCsvRowsArray(array);
  };

  const handleOnSubmit = (e: Event) => {
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
    subject: string
  }

  interface ReplaceObj {
    toReplace: string;
    headerName: string;
  }

  interface Message {
    to: string;
    subject: string;
    content: string;
  }

  const re = /\${(.*?)}/g;

  const createRegexArray = () => {
    const messageStr = message.toString();
    const array = [...messageStr.matchAll(re)];
    const headersArr: Array<String> = [];
    const headersArrFinal: Array<ReplaceObj> = [];
    for (let i = 0; i < array.length; i++) {
      const header = array[i][1];
      if (!headersArr.includes(header)) {
        headersArr.push(header);
        headersArrFinal.push({
          toReplace: array[i][0],
          headerName: array[i][1],
        });
      }
    }
    return headersArrFinal;
  };

  const createMessages = () => {
    const regexArray = createRegexArray();
    let finalMessageArr = [];
    for (let i = 0; i < csvRowsArray.length; i++) {
      const currRow: CsvRow = csvRowsArray[i];
      const to = currRow.email;
      const subject = currRow.subject
      const map = new Map(Object.entries(currRow));
      const finalMap = new Map();
      let content = message;
      for (const [key, value] of map) {
        finalMap.set(key.trim(), value);
      }
      for (let j = 0; j < regexArray.length; j++) {
        const toReplace = regexArray[j].toReplace;
        const replaceVal = finalMap.get(regexArray[j].headerName);
        content = content.replaceAll(toReplace, replaceVal);
      }
      const msg: Message = { to, subject, content };
      finalMessageArr.push(msg);
    }
    setFinalMessages(finalMessageArr);
  };

  const displayMessages = () => {
    return (
      <>
        {finalMessages.map((msg) => (
          <>
            <a>To: {msg.to}</a>
            <br/>
            <br/>
            <a>Subject: {msg.subject}</a>
            <br/>
            <a>Content:</a>
            <p>{msg.content}</p>
          </>
        ))}
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Email Sender </Typography>
        <Divider />
        <br />
        <FormControl fullWidth>
          <Typography variant="h5" component="h5">
            Message
          </Typography>
          <br/>
          <TextareaAutosize
            aria-label="message-text-area"
            placeholder="Paste in message"
            onChange={(e) => setMessage(e.target.value)}
            minRows={20}
          />
          <br />
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            accept={".csv"}
            type="file"
            onChange={handleOnChange}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
          <br />
          <Button
            color="info"
            variant="contained"
            onClick={(e) => {
              handleOnSubmit(e);
            }}
            sx={{maxWidth: 200}}
          >
            Import CSV!
          </Button>
          <br />
          <br />
          <br />
        </FormControl>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {headerKeys.map((key) => (
                <TableCell key={nanoid()}>
                  <b>{key}</b>
                </TableCell>
              ))}
            </TableHead>
            <TableBody>
              {csvRowsArray.map((item) => (
                <TableRow
                  key={"header"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {Object.values(item).map((val) => (
                    <TableCell key={nanoid()} align="left">
                      {val}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button color="info" variant="contained" onClick={createMessages}>
          Print final messages
        </Button>
        <br />
        <br />
        <br />
        <br />
        <Typography variant="h5" component="h5">
          Final Messages
        </Typography>
        <br /> {displayMessages()}
      </Container>
    </ThemeProvider>
  );
};

export default EmailSender;
