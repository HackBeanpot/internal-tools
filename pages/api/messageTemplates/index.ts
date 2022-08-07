import { NextApiRequest, NextApiResponse } from 'next'
import { getMockTemplates, createMockTemplate } from './mockData'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method

  let status: number
  let message: any
  switch (method) {
    case undefined:
      status = 400
      message = 'HTTP method must be explicitly defined'
      break
    case 'GET':
      status = 200
      message = getMockTemplates()
      break
    case 'POST':
      if (!(req.body.title && req.body.message && req.body.createdBy)) {
        status = 400
        message = 'New templates must have a title, ' +
                    'message, and createdBy in HTTP request body json'
      } else {
        status = 200
        message = createMockTemplate(req.body.title, req.body.message, req.body.createdBy)
      }
      break
    default:
      status = 400
      message = 'HTTP method must be GET or POST if no id is given'
  }

  res.status(status).json(JSON.stringify(message))
}
