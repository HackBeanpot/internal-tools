import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { Message } from '../../../../lib/types'
import path from 'path'
const fsPromises = require('fs').promises

/**
 * @param messages Array of data for each recipent - see interface definition above
 * @param from Who the email is from - ex. 'Dean Frame <dean@hackbeanpot.com>
 * @returns [HTTP status code, message]
 */
export async function sendEmail (messages: Message[], from: string, date: string | undefined,
  fileNames: string[]) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'Server env variables undefined!']
  }
  console.log(fileNames)
  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  let modifiedDate
  if (date) {
    modifiedDate = date.split(' ')
    modifiedDate.pop()
    modifiedDate = modifiedDate.join(' ').concat(' -0000')
  }
  const attachments = []
  for (let i = 0; i < fileNames.length; i++) {
    const file = {
      filename: fileNames[i],
      data: await fsPromises.readFile(path.join(process.cwd(), '/attachments/', fileNames[i]))
    }
    attachments.push(file)
  }

  const messageData = {
    from,
    'h:sender': from,
    to: messages.map((message) => message.to),
    subject: '%recipient.subject%',
    text: '%recipient.content%',
    'recipient-variables': constructRecipientVariables(messages),
    'o:deliverytime': modifiedDate,
    attachment: attachments
  }

  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  return [messagesSendResult.status, messagesSendResult.message]
}

function constructRecipientVariables (messages: Message[]) {
  const recipientVariables: { [email: string]: any } = {}
  messages.forEach((message) => {
    recipientVariables[message.to] = { subject: message.subject, content: message.content }
  })

  return JSON.stringify(recipientVariables)
}
