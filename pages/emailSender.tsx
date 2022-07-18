import React, { ChangeEvent, useState } from 'react'
import {
  ThemeProvider,
  Button,
  Divider,
  Link,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  Typography,
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
  ErrorMessage,
  ResultMessage
} from '../lib/types'
import {
  StyledCsvButton,
  StyledCsvButtonsContainer,
  StyledDivider,
  StyledErrorMessage,
  StyledFinalMessagesContainer,
  StyledFinalMessageContent,
  StyledResultMessage,
  StyledSubHeader,
  StyledTable,
  StyledTableContainer,
  StyledTableRow,
  StyledTextField,
  StyledTextArea
} from '../pageStyles/emailSender.styles'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'
import { validEmail } from '../lib/validateEmail'

const EmailSender: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState()
  const [csvRowsArray, setCsvRowsArray] = useState<CsvRow[]>([])
  const [subjectCustomization, setSubjectCustomization] = useState(true)
  const [standardSubject, setStandardSubject] = useState('')
  const [message, setMessage] = useState('')
  const [finalMessages, setFinalMessages] = useState<Message[]>([])
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([])
  const [resultMessage, setResultMessage] = useState<ResultMessage>({ isError: false, message: '' })
  const theme = useTheme()

  const handleEmailStandard = (e: ChangeEvent<HTMLInputElement>) => {
    (e.target.value === 'standard')
      ? setSubjectCustomization(false)
      : setSubjectCustomization(true)
  }

  const printStandardEmailSubject = () => {
    if (!subjectCustomization) {
      return (
        <div>
          <StyledSubHeader variant="h5">1b) Enter standard email subject</StyledSubHeader>
          <StyledTextField
            id="outlined-basic"
            label="Email subject"
            variant="outlined"
            onChange={handleEmailSubject}
          />
        </div>
      )
    }
  }

  const handleEmailSubject = (e: ChangeEvent<HTMLInputElement>) => {
    setStandardSubject(e.target.value)
  }

  let reader: FileReader
  if (typeof window !== 'undefined') {
    reader = new window.FileReader()
  }
  const handleUploadCsv = (e: any) => {
    const filename = e.target.files[0].name
    if (filename.substring(filename.length - 3) !== 'csv') {
      setErrorMessages([{
        id: nanoid(),
        message: 'Uploaded file must be a .csv file'
      }])
    } else {
      setFile(e.target.files[0])
      setErrorMessages([])
      setCsvRowsArray([])
      setResultMessage({ isError: false, message: '' })
    }
  }

  const csvFileToArray = (str: string) => {
    const csvHeaders = str.slice(0, str.indexOf('\n')).trim().split(',')
    if (!csvHeaders.includes('email')) {
      setErrorMessages([{ id: nanoid(), message: 'CSV must contain an email column' }])
      return
    }
    if (!csvHeaders.includes('subject') && subjectCustomization) {
      setErrorMessages([{
        id: nanoid(),
        message: 'CSV must contain a subject column if subject is customized'
      }])
      return
    }
    let allRowValues = str.slice(str.indexOf('\n') + 1).split('\n')
    allRowValues = allRowValues.map((string) => {
      return string.trim()
    })
    const errorList: ErrorMessage[] = []
    const allRowObjects = allRowValues.map((i) => {
      const currRowValues = i.split(',')
      const currRowObject = csvHeaders.reduce(
        (object: any, header: any, index: any) => {
          object[header] = currRowValues[index]
          return object
        },
        {}
      )
      if (currRowObject.email && Object.values(currRowObject)
        .map((value) => typeof value === 'string' ? value.trim() : value)
        .includes('')) {
        errorList.push({
          id: nanoid(),
          message: 'CSV cannot contain empty cells'
        })
      }

      if (currRowObject.email && !validEmail(currRowObject.email)) {
        errorList.push({
          id: nanoid(),
          message: `Email "${currRowObject.email}" not a valid email`
        })
      }
      return currRowObject
    })

    if (errorList.length !== 0) {
      setErrorMessages(errorList)
      return
    }

    if (allRowObjects[allRowObjects.length - 1].email === '') {
      allRowObjects.pop()
    }

    if (new Set(allRowObjects.map((rowObj) => rowObj.email)).size !== allRowObjects.length) {
      setErrorMessages([{
        id: nanoid(),
        message: 'No email address should appear more than once'
      }])
      return
    }

    setCsvRowsArray(allRowObjects)
  }

  const handleImportCsv = (e: any) => {
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

  const createMessages = () => {
    setResultMessage({ isError: false, message: '' })
    const regexArray = createRegexArray()
    const finalMessageArr = []
    let error: string = ''
    for (let i = 0; i < csvRowsArray.length; i++) {
      const currRow: CsvRow = csvRowsArray[i]
      const to = currRow.email
      const subject = (subjectCustomization) ? currRow.subject : standardSubject
      const map = new Map(Object.entries(currRow))
      const finalMap = new Map()
      let content = message
      for (const [key, value] of map) {
        finalMap.set(key.trim(), value)
      }
      for (let j = 0; j < regexArray.length; j++) {
        const toReplace = regexArray[j].toReplace
        const replaceVal = finalMap.get(regexArray[j].headerName)
        if (replaceVal === undefined) {
          error = `Value for ${toReplace} not found.`
        }
        content = content.replaceAll(toReplace, replaceVal)
      }
      const msg: Message = { id: nanoid(), to, subject, content }
      finalMessageArr.push(msg)
    }
    if (error) {
      setResultMessage({ isError: true, message: error })
    } else {
      setFinalMessages(finalMessageArr)
    }
  }

  const getErrorMessage = (id: string) => {
    return errorMessages.find(
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
        if (res.status === 500) {
          setResultMessage({
            isError: true,
            message: res.statusText
          })
        }
        return res.json()
      })
      .then((data) => {
        setResultMessage({
          isError: false,
          message: 'Success! Emails will be sent shortly.'
        })
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <StyledPageContainer>
          <Typography variant="h3"> Email Sender </Typography>
          <Divider />
          <br />
          <Typography variant="body1">
            <Link href="/emailSenderHelp" underline="hover">
              Help Page
            </Link>
          </Typography>
          <FormControl fullWidth>
            <SectionContainer>
              <StyledSubHeader variant="h5">
                1) Email subject
              </StyledSubHeader>
              <FormLabel id="choose-email-subject">
                Use customized or standard email subjects?
              </FormLabel>
              <RadioGroup
                aria-labelledby="choose-email-subject"
                name="email-subject"
                onChange={handleEmailStandard}
              >
                <FormControlLabel value="customized" control={<Radio />}
                  label="Customized (add subjects from CSV)" />
                <FormControlLabel value="standard" control={<Radio />}
                  label="Standard (enter one subject for all emails)" />
              </RadioGroup>
              <br />
            </SectionContainer>
            <SectionContainer>
              <div>{printStandardEmailSubject()}</div>
            </SectionContainer>
            <SectionContainer>
              <StyledSubHeader variant="h5">
                2) Enter email content
              </StyledSubHeader>
              <StyledTextArea
                aria-label="message-text-area"
                placeholder="Paste in message"
                onChange={(e) => setMessage(e.target.value)}
                minRows={20}
              />
            </SectionContainer>
            <SectionContainer>
              <StyledSubHeader variant="h5">
                3) Upload and import csv
              </StyledSubHeader>
              <StyledCsvButtonsContainer>
                <input
                  style={{ display: 'none' }}
                  id="contained-button-file"
                  accept={'.csv'}
                  type="file"
                  onChange={handleUploadCsv}
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
                    handleImportCsv(e)
                  }}
                >
                  Import CSV!
                </StyledCsvButton>
              </StyledCsvButtonsContainer>
              {errorMessages.map((errorMessage) => (
                <StyledErrorMessage key={errorMessage.id}>
                  <br />
                  {errorMessage.message}
                </StyledErrorMessage>
              ))}
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
              4) Verify final messages
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
            <StyledSubHeader variant="h5">5) Send emails</StyledSubHeader>
            <StyledButton
              color="info"
              variant="contained"
              onClick={() => { console.log('test'); handleClickOpen() }}
              width="medium"
              disabled={finalMessages.length === 0 || errorMessages.length > 0}
            >
              Send!
            </StyledButton>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to send all emails?
              </DialogTitle>
              <DialogActions>
                <Button variant="contained" onClick={handleClose}>No</Button>
                <Button variant="outlined" onClick={() => {
                  handleClose(); sendEmails()
                }} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
            <StyledResultMessage
              variant="h5"
              isError={resultMessage.isError}
            >
              {resultMessage.message}
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
