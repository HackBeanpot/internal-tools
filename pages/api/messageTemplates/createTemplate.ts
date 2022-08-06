import { customAlphabet } from 'nanoid'
import { Message } from '../types'

export default async function handler (req: any, res: any) {
  if (!(req.body.title && req.body.message && req.body.createdBy)) {
    res.status(400).json(JSON.stringify('Error: bad request'))
  } else {
    res.status(200).json(JSON.stringify(createMockTemplate(req.body.title,
      req.body.message, req.body.createdBy)))
  }
}

export function createMockTemplate (title: string, message: string, createdBy: string) {
  const nanoid = customAlphabet('1234567890')
  return createMockTemplateWithId(parseInt(nanoid()), title, message, createdBy)
}

export function createMockTemplateWithId (
  id: number, title: string, message: string, createdBy: string
) {
  const template1: Message = {
    messageID: id,
    title,
    message,
    timestamp: new Date(),
    createdBy
  }
  return template1
}
