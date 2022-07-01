import FormData from 'form-data'
import Mailgun from 'mailgun.js'

export interface EmailCsvData {
  to: string,
  subject: string,
  name?: string,
  company?: string,
}

export async function sendEmail (csvData: EmailCsvData[], body: string) {
  // TODO: Implement batch sending. For now, we grab the first email out the list

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'env variables undefined']
  }

  const emailToSend = csvData[0]
  console.log('email to send:', emailToSend)
  console.log('body', body)
  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  const messageData = {
    from: 'Dean Frame <dean@hackbeanpot.com>',
    to: 'dacframe@gmail.com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
  }

  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  return [messagesSendResult.status, messagesSendResult.message]
}
