import middleware from '../../../lib/mongodb'
import nextConnect from 'next-connect'
import { getSession } from 'next-auth/react'

const handler = nextConnect()
handler.use(middleware)
handler.get(async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    const doc = await req.db.collection('templates').findOne()
    res.json(doc)
  } else {
    res.status(401).redirect('/auth/signin')
  }
})
export default handler
