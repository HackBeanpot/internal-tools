import { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from '../../../lib/mongoose'
import { HackerApplicationDataType, createModelWithConnection }
  from '../../../models/HackerApplicationData'
import { Model } from 'mongoose'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const cabinConnection = await mongooseConnect(process.env.CABIN_CLUSTER_NAME)
  const HackerApplicationData = createModelWithConnection(cabinConnection)

  const requestMethod = req.method

  if (requestMethod === 'GET') {
    return GetHandler(req, res, HackerApplicationData)
  }

  if (requestMethod === 'POST') {
    return PostHandler(req, res, HackerApplicationData)
  }

  if (requestMethod === 'DELETE') {
    return res.status(200).send({ message: 'works' })
  }

  if (requestMethod === 'PUT') {
    return res.status(200).send({ message: 'works' })
  }
}

async function GetHandler (req: NextApiRequest,
  res: NextApiResponse,
  HackerApplicationData : Model<HackerApplicationDataType>) {
  if (req.query?.email) {
    try {
      return res.status(200).json(await HackerApplicationData.findOne({ email: req.query.email }))
    } catch (err) {
      return res.status(500).send({ message: err })
    }
  }
  return res.status(200).send(await HackerApplicationData.find())
}

async function PostHandler (req: NextApiRequest,
  res: NextApiResponse,
  HackerApplicationData : Model<HackerApplicationDataType>) {
  try {
    await HackerApplicationData.create(req.body)
  } catch (err : any) {
    return res.status(500).send({ message: err.message })
  }
  return res.status(200).send({ message: 'Works' })
}
