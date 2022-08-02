import { Message } from '../types'

export default async function handler (req: any, res: any) {
  res.status(200).json(JSON.stringify(getMockTemplates()))
}

function getMockTemplates () {
  const template1: Message = {
    messageID: 1,
    title: 'new message title',
    message: 'new message',
    timestamp: new Date('December 17, 1995 03:24:00')
  }
  const template2: Message = {
    messageID: 2,
    title: 'title 2',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00')
  }

  const template3: Message = {
    messageID: 3,
    title: 'title 3',
    message: 'message 3',
    timestamp: new Date('October 9, 2003 03:24:00')
  }

  const messageArray: Message[] = [template1, template2, template3]
  return messageArray
}
