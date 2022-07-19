import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { Message } from '../../../../lib/types'
const path = require('path')
const fsPromises = require('fs').promises

/**
 * @param messages Array of data for each recipent - see interface definition above
 * @param from Who the email is from - ex. 'Dean Frame <dean@hackbeanpot.com>
 * @returns [HTTP status code, message]
 */
export async function sendEmail (messages: Message[], from: string, date: string | undefined) {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'Server env variables undefined!']
  }

  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  let modifiedDate
  if (date) {
    modifiedDate = date.split(' ')
    modifiedDate.pop()
    modifiedDate = modifiedDate.join(' ').concat(' -0000')
  }
  const file = {
    filename: '3_NewsletterBanner.png',
    data: await fsPromises.readFile('/Users/judyzhang/Hackbeanpot/internal-tools/uploads/3_NewsletterBanner.png')
  }
  const attachment = [file]
  const messageData = {
    from,
    to: messages.map((message) => message.to),
    subject: '%recipient.subject%',
    text: '%recipient.content%',
    'recipient-variables': constructRecipientVariables(messages),
    'o:deliverytime': modifiedDate,
    attachment
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
