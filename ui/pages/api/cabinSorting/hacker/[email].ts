import HackerApplicationDataService from '../../../../lib/service/HackerApplicationDataService'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method
  switch (requestMethod) {
    case 'GET':
      return GetHandler(req, res)
    default:
      return res.status(400).send({ message: 'Invalid Request Method Type' })
  }
}

async function GetHandler (req: NextApiRequest, res: NextApiResponse) {
  try {
    return res
      .status(200)
      .json(
        await HackerApplicationDataService.findHackerApplicationByEmail(
          req.query.email.toString()
        )
      )
  } catch (err) {
    return res.status(500).send({ message: `${err}` })
  }
}
