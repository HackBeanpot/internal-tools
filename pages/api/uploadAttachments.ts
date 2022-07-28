import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import formidable, { File } from 'formidable'

export const config = {
  api: {
    bodyParser: false
  }
}

type ProcessedFiles = Array<[string, File]>;

const uploadAttachmentHandler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await postHandler(req, res)
      break
    case 'DELETE':
      await deleteHandler(req, res)
      break
    default:
      return res.status(405).setHeader('Allow', 'GET, DELETE').send(undefined)
  }
}

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200
  let resultBody = { status: 'ok', message: 'Files were uploaded successfully' }

  // Get files using formidable
  const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
    const form = new formidable.IncomingForm()
    const files: ProcessedFiles = []
    form.on('file', function (field, file) {
      files.push([field, file])
    })
    form.on('end', () => resolve(files))
    form.on('error', err => reject(err))
    form.parse(req, () => {
      //
    })
  }).catch(e => {
    console.log(e)
    status = 500
    resultBody = {
      status: 'fail', message: 'Upload error'
    }
  })

  if (files?.length) {
    /* Create directory for uploads */
    const targetPath = path.join(process.cwd(), '/attachments/')
    try {
      await fs.access(targetPath)
    } catch (e) {
      await fs.mkdir(targetPath)
    }

    // Move uploaded files to directory
    for (const file of files) {
      const tempPath = file[1].filepath
      await fs.rename(tempPath, targetPath + file[1].originalFilename)
    }
  }
  res.status(status).json(resultBody)
}

const deleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const status = 200
  const resultBody = { status: 'ok', message: 'Files were uploaded successfully' }
  for (const fileName of req.body.fileNames) {
    const targetPath = path.join(process.cwd(), '/attachments/', fileName)
    await fs.unlink(targetPath)
  }
  res.status(status).json(resultBody)
}

export default uploadAttachmentHandler
