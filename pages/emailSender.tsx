import React, { useState } from 'react'
import {
  ThemeProvider,
  Divider,
  Typography,
  Container,
  FormControl,
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import type { NextPage } from 'next'
import { nanoid } from 'nanoid'
import { useTheme } from '@mui/material/styles'
import { StyledButton } from '../styles/common'
import { CsvRow, ReplaceObj, Message } from '../lib/types'
import {
  SectionContainer,
  StyledCsvButton,
  StyledTextArea,
  StyledCsvButtonsContainer,
  StyledSubHeader,
  StyledFinalMessagesContainer,
  StyledTableContainer
} from '../pageStyles/emailSender.styles'

const EmailSender: NextPage = () => {
  const [file, setFile] = useState()
  const [csvRowsArray, setCsvRowsArray] = useState([])
  const [message, setMessage] = useState('')
  const [finalMessages, setFinalMessages] = useState<Message[]>([])
  const theme = useTheme()

  let reader: FileReader
  if (typeof window !== 'undefined') {
    reader = new window.FileReader()
  }
  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = (str: any) => {
    const csvHeader = str.slice(0, str.indexOf('\n')).split(',')
    const csvRows = str.slice(str.indexOf('\n') + 1).split('\n')

    const array = csvRows.map((i) => {
      const values = i.split(',')
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index]
        return object
      }, {})
      return obj
    })

    if (array[array.length - 1].email === '') {
      array.pop()
    }

    setCsvRowsArray(array)
  }

  const handleOnSubmit = (e: Event) => {
    e.preventDefault()

    if (file) {
      reader.onload = function (event) {
        const csvOutput = event.target?.result
        csvFileToArray(csvOutput)
      }

      reader.readAsText(file)
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...csvRowsArray))

  const re = /\${(.*?)}/g

  const createRegexArray = () => {
    const messageStr = message.toString()
    const array = [...messageStr.matchAll(re)]
    const headersArr: Array<String> = []
    const headersArrFinal: Array<ReplaceObj> = []
    for (let i = 0; i < array.length; i++) {
      const header = array[i][1]
      if (!headersArr.includes(header)) {
        headersArr.push(header)
        headersArrFinal.push({
          toReplace: array[i][0],
          headerName: array[i][1]
        })
      }
    }
    return headersArrFinal
  }

  const createMessages = () => {
    const regexArray = createRegexArray()
    const finalMessageArr = []
    for (let i = 0; i < csvRowsArray.length; i++) {
      const currRow: CsvRow = csvRowsArray[i]
      const to = currRow.email
      const subject = currRow.subject
      const map = new Map(Object.entries(currRow))
      const finalMap = new Map()
      let content = message
      for (const [key, value] of map) {
        finalMap.set(key.trim(), value)
      }
      for (let j = 0; j < regexArray.length; j++) {
        const toReplace = regexArray[j].toReplace
        const replaceVal = finalMap.get(regexArray[j].headerName)
        content = content.replaceAll(toReplace, replaceVal)
      }
      const msg: Message = { to, subject, content }
      finalMessageArr.push(msg)
    }
    setFinalMessages(finalMessageArr)
  }

  const displayMessages = () => {
    return (
      <>
        {finalMessages.map((msg) => (
          <>
            <a>To: {msg.to}</a>
            <br />
            <br />
            <a>Subject: {msg.subject}</a>
            <br />
            <a>Content:</a>
            <br />
            <br/>
            <p>{msg.content}</p>
          </>
        ))}
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h3"> Email Sender </Typography>
        <Divider />
        <br />
        <FormControl fullWidth>
          <SectionContainer>
            <StyledSubHeader variant="h5">1) Enter message</StyledSubHeader>
            <br />
            <StyledTextArea
              aria-label="message-text-area"
              placeholder="Paste in message"
              onChange={(e) => setMessage(e.target.value)}
              minRows={20}
            />
          </SectionContainer>
          <SectionContainer>
            <StyledSubHeader variant="h5">
              2) Upload and import csv
            </StyledSubHeader>
            <StyledCsvButtonsContainer>
              <input
                style={{ display: 'none' }}
                id="contained-button-file"
                accept={'.csv'}
                type="file"
                onChange={handleOnChange}
              />
              <label htmlFor="contained-button-file">
                <StyledCsvButton variant="contained" component="span">
                  Upload
                </StyledCsvButton>
              </label>
              <StyledCsvButton
                variant="contained"
                onClick={(e) => {
                  handleOnSubmit(e)
                }}
              >
                Import CSV!
              </StyledCsvButton>
            </StyledCsvButtonsContainer>
          </SectionContainer>
        </FormControl>
        <StyledTableContainer>
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
                    key={'header'}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        </StyledTableContainer>
        <SectionContainer>
          <StyledSubHeader variant="h5">
            3) Verify final messages
          </StyledSubHeader>
          <StyledButton
            color="info"
            variant="contained"
            onClick={createMessages}
          >
            Print final messages
          </StyledButton>
          <StyledFinalMessagesContainer>
            {displayMessages()}
          </StyledFinalMessagesContainer>
        </SectionContainer>
      </Container>
    </ThemeProvider>
  )
}

export default EmailSender
