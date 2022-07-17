import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { Message } from '../../../../lib/types'

/**
 * @param messages Array of data for each recipent - see interface definition above
 * @param from Who the email is from - ex. 'Dean Frame <dean@hackbeanpot.com>
 * @returns [HTTP status code, message]
 */
export async function sendEmail (messages: Message[], from: string) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'Server env variables undefined!']
  }

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  const messageData = {
    from,
    "h:sender": from,
    to: messages.map((message) => message.to),
    subject: '%recipient.subject%',
    text: '%recipient.content%',
    'recipient-variables': constructRecipientVariables(messages)
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
