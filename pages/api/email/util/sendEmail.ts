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
  // TODO: Implement batch sending. For now, we grab the first email out the list

  // Some things you'll need to do:
  // 1. Replace occurrences of ${company} in emailText with %recipient.company%, do the same with name (helper function)
  // 2. construct a recipient-variables object like below. All the data is in csvData so should be able to do it
  //    in a for loop. (helper function)
  /**
   * 'recipient-variables': JSON.stringify({
       'alice@example.com': {
         name: 'Alice',
         company: 'Facebook',
         subject: 'your company sucks'
        },
        'bob@example.com':
       {
         name: 'Bob',
         company: 'HubSpot',
         subject: 'your company doesn't suck'
       }
     })
   */
  // 3. change the 'to' in messageData to an array with all of the 'email' in csvData
  // 4. change 'subject' in messageData to '%recipient.subject%'

  // you can test these by making your own csv (use Excel or Google Sheets) and email text
  // and change who the email is sent from in line 161 of emailSender.tsx

  // I should be reachable on slack, please please please reach out with any questions! We'll meet up tomorrow. -Dean

  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    return [500, 'env variables undefined']
  }

  const emailToSend = csvData[0]
  console.log('emailToSend:', emailToSend)
  console.log('from:', from)
  const mailgun = new Mailgun(FormData)
  const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY })

  const messageData = {
    from, // this is shorthand for from: from
    to: emailToSend.email,
    subject: emailToSend.subject,
    text: emailText
  }

  const messagesSendResult = await client.messages.create(process.env.MAILGUN_DOMAIN, messageData)

  console.log(messagesSendResult)
  return [messagesSendResult.status, messagesSendResult.message]
}
