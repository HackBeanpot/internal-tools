import { sendEmail } from './util/sendEmail'

export default async function handler (req, res) {
  const [status, message] = await sendEmail(req.body.emailData, req.body.from, req.body.date)
  res.status(status).json({ result: message })
}
