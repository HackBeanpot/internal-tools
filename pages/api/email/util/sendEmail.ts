import FormData from 'form-data'
import Mailgun from 'mailgun.js'

export interface EmailCsvData {
  email: string,
  subject: string,
  name?: string,
  company?: string,
}

/**
 * @param csvData Array of data for each recipent - see interface definition above
 * @param from Who the email is from - ex. 'Dean Frame <dean@hackbeanpot.com>
 * @param emailText Email text
 * @returns [HTTP status code, message]
 */
export async function sendEmail (csvData: EmailCsvData[], from: string, emailText: string) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'Server env variables undefined!']
  }

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  // replace occurances of ${company}
  if (csvData[0].company) {
    const regex = /\${company}/g
    emailText = emailText.replace(regex, '%recipient.company%')
  }

  // replace occurances of ${name}
  if (csvData[0].name) {
    const regex = /\${name}/g
    emailText = emailText.replace(regex, '%recipient.name%')
  }

  const messageData = {
    from,
    to: csvData.map((data) => data.email),
    subject: '%recipient.subject%',
    text: emailText,
    'recipient-variables': constructRecipientVariables(csvData)
  }
  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  return [messagesSendResult.status, messagesSendResult.message]
}

function constructRecipientVariables (csvData: EmailCsvData[]) {
  const recipientVariables: { [email: string]: any } = {}
  csvData.forEach((data) => {
    let varsForCurrentData = {}
    varsForCurrentData = { subject: data.subject }
    if (data.name) {
      varsForCurrentData = { ...varsForCurrentData, name: data.name }
    }
    if (data.company) {
      varsForCurrentData = { ...varsForCurrentData, company: data.company }
    }

    recipientVariables[data.email] = varsForCurrentData
  })

  return JSON.stringify(recipientVariables)
}
