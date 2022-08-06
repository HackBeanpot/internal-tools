import { Message } from '../types'

export default async function handler (req: any, res: any) {
  if (!req.body.id) {
    res.status(400).json(JSON.stringify('Error: bad request'))
  } else {
    res.status(200).json(JSON.stringify(getMockTemplate(req.body.id)))
  }
}

function getMockTemplate (id: number) {
  const template1: Message = {
    messageID: id,
    title: 'message title',
    message: 'message',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'mike'
  }
  return template1
}
