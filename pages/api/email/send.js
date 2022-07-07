import { sendEmail } from './util/sendEmail'

export default async function handler (req, res) {
  const [status, message] = await sendEmail(req.body.emailData, req.body.from)
  res.status(status).json({ result: message })
}
