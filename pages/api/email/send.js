import { sendEmail } from './util/sendEmail'

export default async function handler (req, res) {
  const [status, message] = await sendEmail(req.body.csvData, req.body.body)
  res.status(status).json({ result: message })
}
