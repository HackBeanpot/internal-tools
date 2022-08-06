import { Message } from '../types'

export default async function handler (req: any, res: any) {
  if (!req.body.id) {
    res.status(400).json(JSON.stringify(deleteMockTemplate(req.body.id)))
  } else {
    res.status(200).json(JSON.stringify(deleteMockTemplate(req.body.id)))
  }
}

export function deleteMockTemplate (id : number) {
  const template1: Message = {
    messageID: 1,
    title: 'title 1',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'dean'
  }
  const template2: Message = {
    messageID: 2,
    title: 'title 2',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'karyna'
  }

  const messageArray: Message[] = [template1, template2]

  const found = messageArray.find(function (temp) {
    return temp.messageID === id
  })

  if (found) {
    const target = messageArray.indexOf(found)
    messageArray.splice(target, 1)
  }

  return messageArray
}
