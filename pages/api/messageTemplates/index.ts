import { NextApiRequest, NextApiResponse } from 'next'
import middleware from '../../../lib/mongodb'
import nextConnect from 'next-connect'

const handler = nextConnect<NextApiRequest, NextApiResponse>()
handler.use(middleware)
handler.get(async (req, res) => {
  const doc = await req.db.collection('templates').findOne()
  res.json(doc)
})

export default handler
