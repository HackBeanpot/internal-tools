const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_PROD_CONNECTION_STRING
// DONT PUSH THIS AT ALL EVER (password and username must be private)
const client = new MongoClient('REDACTED', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// establish connection to HackbeanpotCluster db collection
function connectToDatabase () {
  let database
  try {
    database = client.db('HackbeanpotCluster') // collection of databases in cluster
  } catch (err) {
    console.log('Cannot connect to database')
    return
  }
  return database
}

module.exports = { client, connectToDatabase }
