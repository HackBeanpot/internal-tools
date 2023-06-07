import { MongoClient } from 'mongodb'
import 'dotenv/config'

const uri = process.env.MONGO_PROD_CONNECTION_STRING
// DONT PUSH THIS AT ALL EVER (password and username must be private)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// establish connection to HackbeanpotCluster db collection
async function connectToDatabase (collectionName) {
  const database = client.db('HackbeanpotCluster') // collection of databases in cluster
  const collection = database.collection(collectionName)
  return collection
}

export { client, connectToDatabase }
