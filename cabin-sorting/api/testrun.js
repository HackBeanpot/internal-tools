const { MongoClient } = require('mongodb')
// Replace the uri string with your connection string.
const uri = process.env.MONGO_PROD_CONNECTION_STRING

// DONT PUSH THIS AT ALL EVER
const client = new MongoClient('REDACTEDDDDDD look for the string in env', {
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
      isAdmin: false
    }

    // Find all valid hackers that have answers to the cabin questions
    const hackerData = await applicantData.find(query)
    const validHackers = []
    for await (const doc of hackerData) {
      validHackers.push(doc)
    }
    const validatedHackers = validateHackers(hackerData)

    console.log(validatedHackers)
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
