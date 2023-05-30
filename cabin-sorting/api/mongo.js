import nextConnect from 'next-connect'
import middleware from '../../../lib/mongodb'

// queries through HackBeanpotCluster database for submitted applicant data
// req = request    |   res = response
const handler = nextConnect()
handler.use(middleware)
handler.get(async (req, res) => {
  const doc = await req.db.collection("applicant_data").find({
    applicationStatus: "Submitted",
    postAcceptanceResponses: not null
  });

  handleErrors(req, res);

  res.json(doc)
})
export default handler

// Handles any errors (i.e. if the doc is null or empty)
function handleErrors (req, res) {
    const hasEmail = req.body.email;

    if(!hasEmail) {
        res.status(400).json({message: "User does not have an email"})
    }
}

