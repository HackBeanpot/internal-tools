import path from 'path'
import fs from 'fs'
import { client, connectToDatabase } from './mongodb'

let validatedHackers

// Get all valid hacker data from the applicant_data database and convert to json contents
async function grabFromDatabase () {
  const applicantData = await connectToDatabase('applicant_data')

  try {
    // Query for hackers whose application status is submitted and who has a
    // 'Post Acceptance Response' section
    const query = {
      applicationStatus: 'Submitted',
      postAcceptanceResponses: { $exists: true },
      isAdmin: false,
      rsvpStatus: 'Confirmed',
      'postAcceptanceResponses.swag': { $exists: false },
      'postAcceptanceResponses.club': { $exists: true }
    }

    // Find all valid hackers that have answers to the cabin questions
    const hackerDataCursor = applicantData
      .find(query)
      .project({ email: 1, postAcceptanceResponses: 1 })
    const validHackers = []
    // create list of hackers with their information/questions

    while (await hackerDataCursor.hasNext()) {
      let item = await hackerDataCursor.next()

      // THE FOLLOWING CODE MAY BE USED LATER FOR PARSING DATA INTO PROPER FORM
      // We are taking out the postAcceptanceResponses fields and putting them on
      // same level as other fields (for easier access)
      const postAcceptanceResponses = item.postAcceptanceResponses
      delete item.postAcceptanceResponses
      item = { ...item, ...postAcceptanceResponses }

      // duplicate postAcceptanceResponse fields and rename fields to question<> : value
      // so we can map these question answers to cabin answers
      // (for cabin sorting in hackerSortingAlgo.ts)
      const attributes = Object.keys(item)
      for (let i = 0; i <= 9; i++) {
        const j = attributes.length - 9 + i
        const attributevalue = item[attributes[j]]
        // delete item[attributes[j]]
        item[`question${i}`] = attributevalue
      }
      // adding all hackers to list
      validHackers.push(item)
    }

    // get final filtered list of valid hackers
    validatedHackers = validateHackers(validHackers)

    // convert hacker list to json and output data to fromMongoDB.json
    const hackerJson = JSON.stringify(validatedHackers)
    const pathToWrite = path.resolve(
      __dirname,
      '../',
      'data',
      'json_outputs',
      'fromMongoDB.json'
    )
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
    console.error(
      'Oopsie daisy, something went wrong when querying for valid hackers!'
    )
    return []
  } else if (hackers.length === 0) {
    console.warn('Oopsie daisy, no such hackers were found!')
  }

  // ensures that hackers have non-empty email field
  // !! checks if value is null or empty string
  hackers.filter((hacker) => !!hacker.email)
  return hackers
}

grabFromDatabase()

export default grabFromDatabase
