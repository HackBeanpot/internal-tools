import React, { useState } from 'react'
import {
  ThemeProvider,
  Divider,
  Typography,
  FormControl,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  Button,
  Link, 
  Dialog, 
  DialogActions, 
  DialogTitle
} from '@mui/material'
import type { NextPage } from 'next'
import { nanoid } from 'nanoid'
import { useTheme } from '@mui/material/styles'
import {
  StyledButton,
  StyledPageContainer,
  StyledBoldTypograhy,
  SectionContainer
} from '../styles/common'
import {
  CsvRow,
  ReplaceObj,
  Message,
  // ErrorMessage,
  ResultErrorMessage
} from '../lib/types'
import {
  StyledCsvButton,
  StyledTextArea,
  StyledCsvButtonsContainer,
  StyledSubHeader,
  StyledFinalMessagesContainer,
  StyledTableContainer,
  StyledDivider,
  StyledTable,
  StyledTableRow,
  StyledFinalMessageContent,
  StyledErrorMessage,
  StyledResultMessage
} from '../pageStyles/emailSender.styles'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'

const EmailSender: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState()
  const [csvRowsArray, setCsvRowsArray] = useState<CsvRow[]>([])
  const [message, setMessage] = useState('')
  const [finalMessages, setFinalMessages] = useState<Message[]>([])
  const [resultErrorMessage, setResultErrorMessage] =
    useState<ResultErrorMessage>({
      errorMessages: [],
      resultMessage: { isError: false, message: '' }
    })
  const theme = useTheme()

  let reader: FileReader
  if (typeof window !== 'undefined') {
    reader = new window.FileReader()
  }
  const handleOnChange = (e: any) => {
    setFile(e.target.files[0])
  }

  const csvFileToArray = (str: string) => {
    const csvHeaders = str.slice(0, str.indexOf('\n')).trim().split(',')
    let allRowValues = str.slice(str.indexOf('\n') + 1).split('\n')
    allRowValues = allRowValues.map((string) => {
      return string.trim()
    })
    const allRowObjects = allRowValues.map((i) => {
      const currRowValues = i.split(',')
      const currRowObject = csvHeaders.reduce(
        (object: any, header: any, index: any) => {
          object[header] = currRowValues[index]
          return object
        },
        {}
      )
      return currRowObject
    })

    if (allRowObjects[allRowObjects.length - 1].email === '') {
      allRowObjects.pop()
    }
    setCsvRowsArray(allRowObjects)
  }

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    if (file) {
      reader.onload = function (event) {
        const csvOutput = event.target?.result
        if (typeof csvOutput === 'string') {
          csvFileToArray(csvOutput)
        }
      }
      reader.readAsText(file)
    }
  }

  const headerKeys = Object.keys(Object.assign({}, ...csvRowsArray))
  const re = /\${(.*?)}/g

  const createRegexArray = () => {
    const messageStr = message.toString()
    const variableMatchesArr = [...messageStr.matchAll(re)]
    const headersArr: Array<String> = []
    const headersArrFinal: Array<ReplaceObj> = []
    for (let i = 0; i < variableMatchesArr.length; i++) {
      const header = variableMatchesArr[i][1]
      if (!headersArr.includes(header)) {
        headersArr.push(header)
        headersArrFinal.push({
          toReplace: variableMatchesArr[i][0],
          headerName: variableMatchesArr[i][1]
        })
      }
    }
    return headersArrFinal
  }

  // const sendEmails = () => {
  //   const localErrorMessages: ErrorMessage[] = []
  //   for (let i = 0; i < finalMessages.length; i++) {
  //     // This if statement is just for testing / a mock. You can read this as if (error)
  //     // to represent the error case. Replace the following line when actually implementing
  //     // the error check.
  //     if (i % 2 === 0) {
  //       localErrorMessages.push({
  //         id: finalMessages[i].id,
  //         message: 'Errorrrr!'
  //       })
  //     }
  //   }
  //   setResultErrorMessage({
  //     errorMessages: localErrorMessages,
  //     resultMessage: {
  //       isError: localErrorMessages.length > 0,
  //       message:
  //         localErrorMessages.length > 0
  //           ? `Error sending ${localErrorMessages.length} of ${finalMessages.length}`
  //           : 'Sent emails successfully'
  //     }
  //   })
  // }

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
      const msg: Message = { id: nanoid(), to, subject, content }
      finalMessageArr.push(msg)
    }
    setFinalMessages(finalMessageArr)
  }

  const getErrorMessage = (id: string) => {
    return resultErrorMessage.errorMessages.find(
      (currentMessage) => currentMessage.id === id
    )?.message
  }

  const displayMessages = () => {
    return (
      <>
        {finalMessages.map((msg) => (
          <div key={nanoid()}>
            <StyledDivider />
            {getErrorMessage(msg.id) && (
              <StyledErrorMessage>
                Error: {getErrorMessage(msg.id)}
              </StyledErrorMessage>
            )}
            <br />
            <br />
            <Typography variant="body1">To: {msg.to}</Typography>
            <Typography variant="body1">Subject: {msg.subject}</Typography>
            <br />
            <Typography variant="body1">Content:</Typography>
            <br />
            <Typography variant="body1">
              <StyledFinalMessageContent>
                {msg.content}
              </StyledFinalMessageContent>
            </Typography>
          </div>
        ))}
      </>
    )
  }

  const sendEmails = () => {
    // Hardcoding this, as user values in useSession() are undefined for some reason
    const from = 'Dean Frame <dean@hackbeanpot.com>'
    const dataToSend = { emailData: finalMessages, from }
    fetch('/api/email/send', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then((res) => {
        // TODO: Make this error check more robust
        if (res.status === 500) {
          setResultErrorMessage({
            errorMessages: [],
            resultMessage: {
              isError: true,
              message: res.statusText
            }
          })
        }
        return res.json()
      })
      .then((data) => {
        // TODO: surface this to UI
        console.log(data.result)
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <StyledPageContainer>
          <Typography variant="h3"> Email Sender
          </Typography>
          <Divider />
          <br />
          <Typography variant="body1">
            <Link href="/emailSenderHelp" underline="hover">
              Help Page
            </Link>
          </Typography>
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
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
                <StyledCsvButton
                  variant="contained"
                  width="medium"
                  disabled={file === undefined}
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
              <StyledTable aria-label="uploaded csv table">
                <TableHead>
                  {headerKeys.map((key) => (
                    <TableCell key={nanoid()}>
                      <StyledBoldTypograhy variant="body1">
                        {key}
                      </StyledBoldTypograhy>
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {csvRowsArray.map((item) => (
                    <StyledTableRow key={nanoid()}>
                      {Object.values(item).map((val) => (
                        <TableCell key={nanoid()} align="left">
                          {val}
                        </TableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </StyledTable>
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
              disabled={csvRowsArray.length === 0}
              width="medium"
            >
              Print final messages
            </StyledButton>
          </SectionContainer>
          <br />
          <br />
          <SectionContainer>
            <StyledSubHeader variant="h5">4) Send emails</StyledSubHeader>
            <StyledButton
              color="info"
              variant="contained"
              onClick={() => handleClickOpen()}
              width="medium"
              disabled={finalMessages.length === 0}
            >
              Send!
            </StyledButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to send all emails?"}
              </DialogTitle>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>No</Button>
                <Button variant="outlined" onClick={() => { handleClose(); sendEmails(); }} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <StyledResultMessage
              variant="h5"
              isError={resultErrorMessage.resultMessage.isError}
            >
              {resultErrorMessage.resultMessage.message}
            </StyledResultMessage>
          </SectionContainer>
          <StyledFinalMessagesContainer>
            {displayMessages()}
          </StyledFinalMessagesContainer>
        </StyledPageContainer>
      </ThemeProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = getServerSideSessionOrRedirect

export default EmailSender
