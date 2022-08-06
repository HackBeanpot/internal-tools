import { NextApiRequest, NextApiResponse } from 'next'
import { Message } from '../types'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.id) {
    res.status(400).json(JSON.stringify('Error: bad request'))
  } else {
    res.status(200).json(JSON.stringify(getMockTemplate(req.body.id)))
  }
}

export function getMockTemplate (id: number) {
  const template1: Message = {
    messageID: id,
    title: 'message title',
    message: 'message',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'mike'
  }
  return template1
}
