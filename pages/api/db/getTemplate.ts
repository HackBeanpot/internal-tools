import { Message } from '../types'

export default async function handler (req: any, res: any) {
  res.status(200).json(JSON.stringify(getMockTemplate(req.body.id)))
}

function getMockTemplate (id: number) {
  const template1: Message = {
    messageID: id,
    title: 'new message title',
    message: 'new message',
    timestamp: new Date('December 17, 1995 03:24:00')
  }
  return template1
}
