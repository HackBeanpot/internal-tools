import { NextApiRequest, NextApiResponse } from 'next'
import { getMockTemplates, createMockTemplate } from '../../../lib/mockData'
import { Response } from '../../../lib/types'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method

  let output: Response

  switch (method) {
    case undefined:
      output = { status: 400, message: 'HTTP method must be explicitly defined' }
      break
    case 'GET':
      output = handleGet()
      break
    case 'POST':
      output = handlePost(req.body)
      break
    default:
      output = { status: 400, message: 'HTTP method must be GET or POST if no id is given' }
  }

  const status: number = output.status
  const message: any = output.message
  res.status(status).json(JSON.stringify(message))
}

function handleGet () {
  const status: number = 200
  const message = getMockTemplates()
  return { status, message }
}

function handlePost (body: any) {
  let status: number
  let message: any
  if (!(body.title && body.message && body.createdBy)) {
    status = 400
    message = 'New templates must have a title, ' +
      'message, and createdBy in HTTP request body json'
  } else {
    status = 200
    message = createMockTemplate(
      body.title, body.message, body.createdBy
    )
  }
  return { status, message }
}
