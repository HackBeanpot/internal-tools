import { NextApiRequest, NextApiResponse } from 'next'
import { createMockTemplate } from '../../../lib/mockData'
import { Response } from '../../../lib/types'
import middleware from '../../../lib/mongodb'
import nextConnect from 'next-connect'
// testing git
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

function handleGet (): object {
  const handler = nextConnect()

  handler.use(middleware)
  let getResult = {}
  handler.get(async (req, res) => {
    const allTemplates = await req.db.collection('templates').find({}).toArray()
    getResult = res.json({ status: 200, message: allTemplates })
  })
  return getResult
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

export async function getStaticProps () {
  const res = await fetch('http://localhost:3000/pages/api/messageTemplates/[id].ts')
  const json = await res.json()
  return {
    props: {
      data: json
    }
  }
}
