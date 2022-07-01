import { sendEmail } from './util/sendEmail'

export default async function handler (req, res) {
  const [status, message] = await sendEmail(req.body.csvData, req.body.from, req.body.emailText)
  res.status(status).json({ result: message })
}
