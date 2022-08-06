import { NextApiRequest, NextApiResponse } from 'next'
import { Message } from '../types'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (!(req.body.id && req.body.title && req.body.message && req.body.createdBy)) {
    res.status(400).json(JSON.stringify('Error: bad request'))
  } else {
    res.status(200).json(JSON.stringify(updateMockTemplate(req.body.id, req.body.title,
      req.body.message, req.body.createdBy)))
  }
}

export function updateMockTemplate (id: number, title: string, message: string, createdBy: string) {
  const template1: Message = {
    messageID: id,
    title,
    message,
    timestamp: new Date(),
    createdBy
  }

  return template1
}
