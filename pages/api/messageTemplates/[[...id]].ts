import { NextApiRequest, NextApiResponse } from 'next'
import { getMockTemplates } from './getAllTemplates'
import { getMockTemplate } from './getTemplate'
import { createMockTemplate, createMockTemplateWithId } from './createTemplate'
import { updateMockTemplate } from './updateTemplate'
import { deleteMockTemplate } from './deleteTemplate'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  const method = req.method

  if (typeof id === 'string' || !isValidRouteIdArr(id, method)) {
    res.status(400).json(JSON.stringify(
      'Bad request: Bad number of id\'s specified in route.'
    ))
    return
  }

  let status: number
  let message: any
  switch (method) {
    case undefined:
      status = 400
      message = 'HTTP method must be explicitly defined'
      break
    case 'GET':
      if (!id) {
        status = 200
        message = getMockTemplates()
      } else {
        status = 200
        message = getMockTemplate(parseInt(id[0]))
      }
      break
    case 'POST':
      if (!(req.body.title && req.body.message && req.body.createdBy)) {
        status = 400
        message = 'New templates must have a title, ' +
          'message, and createdBy in HTTP request body json'
      } else {
        status = 200
        if (id && id[0]) {
          message = createMockTemplateWithId(
            parseInt(id[0]), req.body.title, req.body.message, req.body.createdBy
          )
        } else {
          message = createMockTemplate(req.body.title, req.body.message, req.body.createdBy)
        }
      }
      break
    case 'PUT':
      if (!(req.body.title && req.body.message && req.body.createdBy)) {
        status = 400
        message = 'Updated template must have title, message, createdBy in HTTP request body json'
      } else {
        status = 200
        message = updateMockTemplate(
          parseInt(id[0]), req.body.title, req.body.message, req.body.createdBy
        )
      }
      break
    case 'DELETE':
      status = 200
      message = deleteMockTemplate(parseInt(id[0]))
      break
    default:
      status = 400
      message = 'HTTP method must be one of GET, POST, PUT, DELETE'
  }

  res.status(status).json(JSON.stringify(message))
}

// For now I'm only allowing creating/updating/deleting one template at a time
// Use GET with no id defined to get all message templates: GET /api/messageTemplates
// Use POST with no id defined to create a template with a generated id
// Use POST with an id defined to create a template with the given id
function isValidRouteIdArr (routeId: string[], method: string | undefined) : boolean {
  return (method && (method === 'GET' || method === 'POST'))
    ? routeId === undefined || routeId.length === 1
    : routeId.length === 1
}
