const { MongoClient } = require('mongodb')
const path = require('path')
const fs = require('fs')

// Replace the uri string with your connection string.
const uri = process.env.MONGO_PROD_CONNECTION_STRING

// DONT PUSH THIS AT ALL EVER
const client = new MongoClient('REDACTED', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// Get all valid hacker data from the applicant_data database
async function run () {
  let database
  let applicantData
  try {
    database = client.db('HackbeanpotCluster') // collection of databases in cluster
    applicantData = database.collection('applicant_data') // single database
  } catch (err) {
    console.log('Cannot connect to database')
    return
  }

  try {
    // Query for hackers whose application status is submitted and who has a
    // 'Post Acceptance Response' section
    const query = {
      applicationStatus: 'Submitted',
      postAcceptanceResponses: { $exists: true },
      isAdmin: false,
      rsvpStatus: 'Confirmed'
    }

    // Find all valid hackers that have answers to the cabin questions
    const hackerDataCursor = await applicantData.find(query)
    const validHackers = []
    while (await hackerDataCursor.hasNext()) {
      const item = await hackerDataCursor.next()
      validHackers.push(item)
    }
    const validatedHackers = validateHackers(validHackers)

    const hackerJson = JSON.stringify(validatedHackers)
    const pathToWrite = path.resolve('data', 'json_outputs', 'fromMongoDB.json')
    fs.writeFileSync(pathToWrite, hackerJson)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

// returns valid hacker list and handles errors if data doesn't exist or is empty
function validateHackers (hackers) {
  if (hackers === null) {
    console.log(
      'Oopsie daisy, something went wrong when querying for valid hackers!'
    )
    throw new Error('Oopsie daisy, something went wrong when querying for valid hacker')
  } else if (hackers.length === 0) {
    console.log('Oopsie daisy, no such hackers were found!')
  }

  // !! checks if value is null or empty string
  hackers.filter(hacker => !!hacker.email)
  return hackers
}

run()