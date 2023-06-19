import { NextApiRequest, NextApiResponse } from 'next'
import {
  getMockTemplate,
  createMockTemplateWithId,
  updateMockTemplate,
  deleteMockTemplate
} from '../../../lib/mockData'
import { Response } from '../../../lib/types'
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const method = req.method

  let output: Response

  switch (method) {
    case undefined:
      output = { status: 400, message: 'HTTP method must be explicitly defined' }
      break
    case 'GET':
      output = handleGet(id[0])
      break
    case 'POST':
      output = handlePost(id[0], req.body)
      break
    case 'PUT':
      output = handlePut(id[0], req.body)
      break
    case 'DELETE':
      output = handleDelete(id[0])
      break
    default:
      output = { status: 400, message: 'HTTP method must be one of GET, POST, PUT, DELETE' }
  }

  const status: number = output.status
  const message: any = output.message
  res.status(status).json(JSON.stringify(message))
}

function handleGet (id: string) {
  const status: number = 200
  const message = getMockTemplate(parseInt(id))
  return { status, message }
}

function handlePost (id: string, body: any) {
  let status: number
  let message
  if (!(body.title && body.message && body.createdBy)) {
    status = 400
    message = 'New templates must have a title, ' +
      'message, and createdBy in HTTP request body json'
  } else {
    status = 200
    message = createMockTemplateWithId(
      parseInt(id), body.title, body.message, body.createdBy
    )
  }
  return { status, message }
}

function handlePut (id: string, body: any) {
  let status: number
  let message
  if (!(body.title && body.message && body.createdBy)) {
    status = 400
    message = 'Updated template must have title, message, createdBy in HTTP request body json'
  } else {
    status = 200
    message = updateMockTemplate(
      parseInt(id), body.title, body.message, body.createdBy
    )
  }
  return { status, message }
}

function handleDelete (id: string) {
  const status: number = 200
  const message = deleteMockTemplate(parseInt(id[0]))
  return { status, message }
}
