import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { readdirSync, rmSync } from 'fs'

const deleteAttachments = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200
  let resultBody = { status: 'ok', message: 'Files were successfully deleted' }
  const targetPath = path.join(process.cwd(), '/attachments/')
  try {
    await readdirSync(targetPath).forEach(f => rmSync(`${targetPath}/${f}`))
  } catch (e) {
    status = 500
    resultBody = {
      status: 'fail', message: 'Delete error'
    }
  }
  res.status(status).json(resultBody)
}

export default deleteAttachments
