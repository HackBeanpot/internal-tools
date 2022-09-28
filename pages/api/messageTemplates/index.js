import middleware from '../../../lib/mongodb'
import nextConnect from 'next-connect'
import { getServerSideSessionOrRedirect } from '../../../server/getServerSideSessionOrRedirect'

const handler = nextConnect()
handler.use(middleware)
handler.get(async (req, res) => {
  const doc = await req.db.collection('templates').findOne()
  res.json(doc)
})
export const getServerSideProps = getServerSideSessionOrRedirect()
export default handler
