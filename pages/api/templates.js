import clientPromise from '../../lib/mongodb'
export default async function handler (req, res) {
  const client = await clientPromise
  const db = client.db('HackBeanpotCluster')
  switch (req.method) {
    case 'POST':
      const bodyObject = JSON.parse(req.body)
      const myTemplate = await db.collection('templates').insertOne(bodyObject)
      res.json(myTemplate.ops[0])
      break
    case 'GET':
      const allTemplates = await db.collection('templates').find({}).toArray()
      res.json({ status: 200, data: allTemplates })
      break
  }
}

export async function getServerSideProps (context) {
  const res = await fetch('http://localhost:3000/api/templates', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const allTemplates = await res.json()
  return {
    props: { allTemplates }
  }
}
