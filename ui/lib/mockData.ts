import { customAlphabet } from 'nanoid'
import { MessageTemplate } from './types'

export function createMockTemplate (title: string, message: string, createdBy: string) {
  const nanoid = customAlphabet('1234567890')
  return createMockTemplateWithId(parseInt(nanoid()), title, message, createdBy)
}

export function createMockTemplateWithId (
  id: number, title: string, message: string, createdBy: string
) {
  const template1: MessageTemplate = {
    messageID: id,
    title,
    message,
    timestamp: new Date(),
    createdBy
  }
  return template1
}

export function deleteMockTemplate (id : number) {
  const template1: MessageTemplate = {
    messageID: 1,
    title: 'title 1',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'dean'
  }
  const template2: MessageTemplate = {
    messageID: 2,
    title: 'title 2',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'karyna'
  }

  const messageArray: MessageTemplate[] = [template1, template2]

  const found = messageArray.find(function (temp) {
    return temp.messageID === id
  })

  if (found) {
    const target = messageArray.indexOf(found)
    messageArray.splice(target, 1)
  }

  return messageArray
}

export function getMockTemplates () {
  const template1: MessageTemplate = {
    messageID: 1,
    title: 'title 1',
    message: 'message 1',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'mike'
  }
  const template2: MessageTemplate = {
    messageID: 2,
    title: 'title 2',
    message: 'message 2',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'karyna'
  }

  const template3: MessageTemplate = {
    messageID: 3,
    title: 'title 3',
    message: 'message 3',
    timestamp: new Date('October 9, 2003 03:24:00'),
    createdBy: 'dean'
  }

  const messageArray: MessageTemplate[] = [template1, template2, template3]
  return messageArray
}

export function getMockTemplate (id: number) {
  const template1: MessageTemplate = {
    messageID: id,
    title: 'message title',
    message: 'message',
    timestamp: new Date('December 17, 1995 03:24:00'),
    createdBy: 'mike'
  }
  return template1
}

export function updateMockTemplate (id: number, title: string, message: string, createdBy: string) {
  const template1: MessageTemplate = {
    messageID: id,
    title,
    message,
    timestamp: new Date(),
    createdBy
  }

  return template1
}
