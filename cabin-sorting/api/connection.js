import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

// Connects to HackBeanPot's Cluster on MongoDB
const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true, // will use old deprecated URL parser if new one gives an error
  useUnifiedTopology: true
})

// Accesses a specific database within the cluster's collection of databases
// - accesses "HackbeanpotCluster" database
async function connectDatabase (req, req) {
  await client.connect()
  req.dbClient = client
  req.db = client.db('HackbeanpotCluster')
  return next()
}
const middleware = nextConnect()

middleware.use(database)

export default connectDatabase
