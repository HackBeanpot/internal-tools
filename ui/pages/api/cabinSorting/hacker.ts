import { NextApiResponse } from 'next'
import { HackerApplicationDataType } from '../../../models/HackerApplicationData'
import HackerApplicationDataService from '../../../lib/service/HackerApplicationDataService'

type HackerApiRequest = {
  method: String;
  query: { email: string };
  body: HackerApplicationDataType | HackerApplicationDataType[];
};

export default async function handler (
  req: HackerApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method
  switch (requestMethod) {
    case 'GET':
      return GetHandler(req, res)
    case 'POST':
      return PostHandler(req, res)
    case 'DELETE':
      return res.status(200).send({ message: 'works' })
    case 'PUT':
      return res.status(200).send({ message: 'works' })
  }
}

async function GetHandler (req: HackerApiRequest, res: NextApiResponse) {
  try {
    if (req.query?.email) {
      return res
        .status(200)
        .json(
          await HackerApplicationDataService.findHackerApplicationByEmail(
            req.query.email
          )
        )
    }
    return res
      .status(200)
      .send(await HackerApplicationDataService.findAllHackerApplications())
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}

async function PostHandler (req: HackerApiRequest, res: NextApiResponse) {
  try {
    if (Array.isArray(req.body)) {
      const savedHackers =
        await HackerApplicationDataService.saveAllHackerApplications(req.body)
      const savedHackerEmails = savedHackers.map((hacker) => hacker.email)
      res.status(200).send({
        message: `Saved hackers application data with email: ${savedHackerEmails}`
      })
    } else {
      const savedHacker =
        await HackerApplicationDataService.saveHackerApplication(req.body)
      const savedHackerEmail = savedHacker.email
      res.status(200).send({
        message: `Saved hacker application data with email: ${savedHackerEmail}`
      })
    }
  } catch (err: any) {
    return res.status(500).send({ message: err.message })
  }
}
