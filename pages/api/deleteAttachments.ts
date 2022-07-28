import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { readdirSync, rmSync } from 'fs'

const deleteAttachmentsHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'DELETE':
      await deleteHandler(req, res)
      break
    default:
      return res.status(405).setHeader('Allow', 'DELETE').send(undefined)
  }
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(`console logging req.body ${req.body}`)
  const fileNames = JSON.parse(req.body).fileNames
  console.log(`body ${fileNames}`)
  const status = 200
  const resultBody = { status: 'ok', message: 'Files were uploaded successfully' }
  const targetPath = path.join(process.cwd(), '/attachments/')
  await readdirSync(targetPath).forEach(f => rmSync(`${targetPath}/${f}`))
  res.status(status).json(resultBody)
}

export default deleteAttachmentsHandler
