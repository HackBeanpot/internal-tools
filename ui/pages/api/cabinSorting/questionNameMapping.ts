import { NextApiRequest, NextApiResponse } from 'next'

import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method

  if (requestMethod === 'GET') {
    return GetHandler(req, res)
  }
}

async function GetHandler (req: NextApiRequest, res: NextApiResponse) {
  const csvFileAbsolutePath = path.resolve('lib', 'questionNameMapping.csv')
  console.log('reading from csv file: ' + csvFileAbsolutePath)

  // error handling in case file is missing
  let fileContent
  try {
    fileContent = fs.readFileSync(csvFileAbsolutePath, {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.log('File cannot be found')
    return []
  }

  const options = {
    delimiter: ',',
    columns: false
  }
  const content: string[][] = parse(fileContent, options)
  const ret: { [key: string]: string } = {}

  for (let i = 0; i < content[0].length; i++) {
    ret[content[0][i]] = content[1][i]
  }
  return res.status(200).send(ret)
}
