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
  // const ccRecipents = messages[0].cc
  // const bccRecipents = messages[0].bcc
  const messageData = {
    from,
    'h:sender': from,
    to: formatAllRecipents(messages),
    cc: messages.map((message) => message.cc).flat(1),
    bcc: messages.map((message) => message.bcc).flat(1),
    subject: '%recipient.subject%',
    html: '%recipient.content%',
    'recipient-variables': constructRecipientVariables(
      messages,
      signature),
    'o:deliverytime': modifiedDate,
    inline
  }
  console.log(messageData.cc)

  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  return [messagesSendResult.status, messagesSendResult.message]
}

function formatAllRecipents (messages: Message[]) {
  const allRecipents: string[][] = []
  messages.forEach((msg) => {
    const ccRecipents = msg.cc
    const bccRecipents = msg.bcc
    const recipentMessage: string[] = []
    recipentMessage.push(msg.to)
    ccRecipents.forEach((recipient) => {
      recipentMessage.push(recipient)
    })
    bccRecipents.forEach((recipient) => {
      recipentMessage.push(recipient)
    })
    allRecipents.push(recipentMessage)
  })
  return allRecipents.flat(1)
}

function constructRecipientVariables (
  messages: Message[],
  signature: string) {
  const recipientVariables: { [email: string]: any } = {}
  messages.forEach((message) => {
    const ccRecipents = message.cc
    const bccRecipents = message.bcc
    recipientVariables[message.to] = {
      subject: message.subject,
      content: message.content +
        '<br/><br/>' +
        signature.replace('/assets/hbplogo.png', 'cid:hbplogo.png')
    }
    if (ccRecipents) {
      ccRecipents.forEach((recipient) => {
        recipientVariables[recipient] = {
          subject: message.subject,
          content: message.content +
        '<br/><br/>' +
        signature.replace('/assets/hbplogo.png', 'cid:hbplogo.png')
        }
      })
    }
    if (bccRecipents) {
      bccRecipents.forEach((recipient) => {
        recipientVariables[recipient] = {
          subject: message.subject,
          content: message.content +
        '<br/><br/>' +
        signature.replace('/assets/hbplogo.png', 'cid:hbplogo.png')
        }
      })
    }
  })

  return JSON.stringify(recipientVariables)
}
