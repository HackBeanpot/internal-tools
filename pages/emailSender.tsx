import React, { ChangeEvent, useState } from 'react'
import * as ReactDOMServer from 'react-dom/server'
import {
  ThemeProvider,
  Divider,
  Link,
  FormControl,
  Typography
} from '@mui/material'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { nanoid } from 'nanoid'
import { useTheme } from '@mui/material/styles'
import { StyledPageContainer, SectionContainer } from '../styles/common'
import {
  CsvRow,
  ReplaceObj,
  Message,
  ErrorMessage,
  ResultMessage,
  SignatureData,
  EmailHeader
} from '../lib/types'
import {
  StyledErrorMessage
} from '../pageStyles/emailSender.styles'
import Layout from '../components/layout/Layout'
import { GetServerSideProps } from 'next'
import { getServerSideSessionOrRedirect } from '../server/getServerSideSessionOrRedirect'
import { validEmail } from '../lib/validateEmail'
import EmailSignature from '../components/emailSignature/emailSignature'
import PrintMessage from '../components/printMessages/printMessages'
import ImportCSVSection from '../components/importCSVSection/importCSVSection'
import MessageHeaderSection from '../components/emailHeaderSection/emailHeaderSection'
import EmailContent from '../components/emailContentSection/emailContentSection'
import SendEmails from '../components/sendEmails/sendEmails'
import CSVTable from '../components/csvTable/CSVTable'
import DisplayMessages from '../components/displayMessages/displayMessages'

const EmailSender: NextPage = () => {
  const { data: session } = useSession({ required: true })
  const [checkedDeliveryBox, setCheckedDeliveryBox] = useState(false)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState()
  const [csvRowsArray, setCsvRowsArray] = useState<CsvRow[]>([])
  const [subjectCustomization, setSubjectCustomization] = useState(true)
  const [standardSubject, setStandardSubject] = useState('')
  const [emailHeader, setEmailHeader] = useState<EmailHeader>({})
  const [message, setMessage] = useState('')
  const [finalMessages, setFinalMessages] = useState<Message[]>([])
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([])
  const [resultMessage, setResultMessage] = useState<ResultMessage>({
    isError: false,
    message: ''
  })
  const theme = useTheme()
  const [dateTime, setDeliveryDateTime] = useState<Date | null>(null)
  const [useSignature, setUseSignature] = useState(false)
  const [signatureData, setSignatureData] = useState<SignatureData | undefined>(undefined)

  const handleEmailStandard = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.value === 'standard'
      ? setSubjectCustomization(false)
      : setSubjectCustomization(true)
  }

  const handleEmailHeader = (ccRecipents: string, bccRecipents: string) => {
    const emailRegex = /([a-zA-Z0-9._+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
    const ccRecipentsArray = ccRecipents.match(emailRegex)
    const bccRecipentsArray = bccRecipents.match(emailRegex)
    const emailHeaderCreated: EmailHeader = {
      cc: ccRecipentsArray || [],
      bcc: bccRecipentsArray || []
    }
    setEmailHeader(emailHeaderCreated)
  }

  const editFinalMessages = (
    id: string,
    to: string,
    cc: string[],
    bcc: string[],
    subject: string,
    messageContent: string
  ) => {
    const finalMessageArr = []
    const content = messageContent
    const finalMessageIndex = finalMessages.findIndex((finalMessage) => {
      return finalMessage.id === id
    })
    for (let i = 0; i < finalMessages.length; i++) {
      if (i === finalMessageIndex) {
        const msg: Message = { id, to, cc, bcc, subject, content }
        finalMessageArr.push(msg)
      } else {
        finalMessageArr.push(finalMessages[i])
      }
    }
    setFinalMessages(finalMessageArr)
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
      setErrorMessages([
        {
          id: nanoid(),
          message: 'Uploaded file must be a .csv file'
        }
      ])
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
      setErrorMessages([
        { id: nanoid(), message: 'CSV must contain an email column' }
      ])
      return
    }
    if (!csvHeaders.includes('subject') && subjectCustomization) {
      setErrorMessages([
        {
          id: nanoid(),
          message: 'CSV must contain a subject column if subject is customized'
        }
      ])
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
      if (
        currRowObject.email &&
        Object.values(currRowObject)
          .map((value) => (typeof value === 'string' ? value.trim() : value))
          .includes('')
      ) {
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

    if (
      new Set(allRowObjects.map((rowObj) => rowObj.email)).size !==
      allRowObjects.length
    ) {
      setErrorMessages([
        {
          id: nanoid(),
          message: 'No email address should appear more than once'
        }
      ])
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
      const subject = subjectCustomization ? currRow.subject : standardSubject
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

      const msg: Message = {
        cc: emailHeader.cc,
        bcc: emailHeader.bcc,
        id: nanoid(),
        to,
        subject,
        content
      }
      finalMessageArr.push(msg)
    }
    if (error) {
      setResultMessage({ isError: true, message: error })
    } else {
      setFinalMessages(finalMessageArr)
    }
  }

  const getErrorMessage = (id: string) => {
    return errorMessages.find((currentMessage) => currentMessage.id === id)
      ?.message
  }

  const sendEmails = () => {
    // format: 'FName LName <email@hackbeanpot.com>'
    const from = '' + session?.user?.name + ' <' + session?.user?.email + '>'
    const dataToSend = {
      emailData: finalMessages,
      from,
      date: checkedDeliveryBox ? dateTime?.toUTCString() : undefined,
      signature: signatureData
        ? ReactDOMServer.renderToStaticMarkup(<EmailSignature signatureData={signatureData} />)
        : ''
    }
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
            <MessageHeaderSection
              handleEmailStandard={handleEmailStandard}
              subjectCustomization={subjectCustomization}
              handleEmailSubject={handleEmailSubject}
              handleEmailHeader={handleEmailHeader}
            />
            <EmailContent
              setMessage={setMessage}
              useSignature={useSignature}
              setUseSignature={setUseSignature}
              setSignatureData={setSignatureData}
            />
            <ImportCSVSection
              file={file === undefined}
              handleImportCsv={handleImportCsv}
              handleUploadCsv={handleUploadCsv}
            />
            <SectionContainer>
              {errorMessages.map((errorMessage) => (
                <StyledErrorMessage key={errorMessage.id}>
                  <br />
                  {errorMessage.message}
                </StyledErrorMessage>
              ))}
            </SectionContainer>
          </FormControl>
          <CSVTable headers={headerKeys} rows={csvRowsArray} />
          <PrintMessage
            length={csvRowsArray.length}
            createMessages={createMessages}
          />
          <br />
          <br />
          <SendEmails
            setCheckedDeliveryBox={setCheckedDeliveryBox}
            checkedDeliveryBox={checkedDeliveryBox}
            dateTime={dateTime}
            handleClickOpen={handleClickOpen}
            setDeliveryDateTime={setDeliveryDateTime}
            finalMessagesLength={finalMessages.length === 0}
            errorMessagesLength={errorMessages.length > 0}
            handleClose={handleClose}
            sendEmails={sendEmails}
            resultMessage={resultMessage}
            open={open}
          />
          <DisplayMessages
          finalMessages={finalMessages}
          editFinalMessages={editFinalMessages}
          getErrorMessage={getErrorMessage}
          useSignature={useSignature}
          signatureData={signatureData}
          />
        </StyledPageContainer>
      </ThemeProvider>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps =
  getServerSideSessionOrRedirect

export default EmailSender
