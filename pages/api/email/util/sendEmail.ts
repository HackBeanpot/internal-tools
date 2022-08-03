import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { Message } from '../../../../lib/types'
import * as fs from 'fs/promises'
import * as path from 'path'

/**
 * @param messages Array of data for each recipent - see interface definition above
 * @param from Who the email is from - ex. 'Dean Frame <dean@hackbeanpot.com>
 * @returns [HTTP status code, message]
 */
export async function sendEmail (
  messages: Message[], from: string, date: string | undefined, signature: string
) {
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
  let inline
  if (signature) {
    inline = {
      filename: 'hbplogo.png',
      data: await fs.readFile(path.join(process.cwd(), '/public/assets/hbplogo.png'))
    }
  }
  const messageData = {
    from,
    'h:sender': from,
    to: messages.map((message) => message.to),
    subject: '%recipient.subject%',
    html: '%recipient.content%',
    'recipient-variables': constructRecipientVariables(messages, signature),
    'o:deliverytime': modifiedDate,
    inline
  }

  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  return [messagesSendResult.status, messagesSendResult.message]
}

function constructRecipientVariables (messages: Message[], signature: string) {
  const recipientVariables: { [email: string]: any } = {}
  messages.forEach((message) => {
    recipientVariables[message.to] = {
      subject: message.subject,
      content: message.content +
        '<br/><br/>' +
        signature.replace('/assets/hbplogo.png', 'cid:hbplogo.png')
    }
  })

  return JSON.stringify(recipientVariables)
}
