import nextConnect from 'next-connect'
import middleware from '../../../lib/mongodb'
const handler = nextConnect()
handler.use(middleware)
handler.get(async (req, res) => {
  const doc = await req.db.collection('templates').findOne()
  // ** Future Addtions **
  // error checking
  // if doc is null
  // if doc is empty
  // return good status messages in these cases
  res.json(doc)
})
export default handler
