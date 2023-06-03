const { MongoClient } = require('mongodb')
const path = require('path')
const fs = require('fs')

// Replace the uri string with your connection string.
const uri = process.env.MONGO_PROD_CONNECTION_STRING
let validatedHackers

// DONT PUSH THIS AT ALL EVER
const client = new MongoClient('REDACTED', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// Get all valid hacker data from the applicant_data database
async function grabFromDatabase () {
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
    const hackerDataCursor = await applicantData.find(query).project({ email: 1, postAcceptanceResponses: 1 })
    const validHackers = []
    while (await hackerDataCursor.hasNext()) {
      const item = await hackerDataCursor.next()

      // THE FOLLOWING CODE MAY BE USED LATER FOR PARSING DATA INTO PROPER FORM
      // const postAcceptanceResponses = item.postAcceptanceResponses
      // delete item.postAcceptanceResponses
      // item = { ...item, ...postAcceptanceResponses }

      // const attributes = Object.keys(item)
      // for (let i = 0; i <= 8; i++) {
      //   const j = attributes.length - 8 + i
      //   const attributevalue = item[attributes[j]]
      //   // delete item[attributes[j]]
      //   item[`question${i}`] = attributevalue
      //   if (Array.isArray(item[`question${i}`])) item[`question${i}`] = item[`question${i}`][0].trim()
      // }
      validHackers.push(item)
    }

    validatedHackers = validateHackers(validHackers)

    const hackerJson = JSON.stringify(validatedHackers)
    const pathToWrite = path.resolve(__dirname, '../', 'data', 'json_outputs', 'fromMongoDB.json')
    fs.writeFileSync(pathToWrite, hackerJson)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
  return validatedHackers
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

grabFromDatabase()

module.exports = { grabFromDatabase }
