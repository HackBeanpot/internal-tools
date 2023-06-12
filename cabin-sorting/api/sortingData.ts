import path from "path";
import fs from "fs";
import { client, connectToDatabase } from "./connectMongo";
import { Hacker } from "../hackerSortingAlgo";

let validatedHackers : Hacker[] = [];
const validHackers : Hacker[] = [];

// Get all valid hacker data from the applicant_data database and convert to json contents
async function grabFromDatabase() {
  const applicantData = await connectToDatabase("applicant_data");

  try {
    // Query for hackers whose application status is submitted and who has a
    // 'Post Acceptance Response' section
    const query = {
      applicationStatus: "Submitted",
      postAcceptanceResponses: { $exists: true },
      isAdmin: false,
      rsvpStatus: "Confirmed",
      "postAcceptanceResponses.swag": { $exists: false },
      "postAcceptanceResponses.club": { $exists: true },
    };

    // Find all valid hackers that have answers to the cabin questions
    const hackerDataCursor = applicantData
      .find(query)
      .project({ email: 1, postAcceptanceResponses: 1 });

    // gather, format, and filter list of hackers from cursor
    const hackerDocuments = await hackerDataCursor.toArray();
    hackerDocuments.map((item) => parseAndFormatHacker(item));
    validatedHackers = validateHackers(validHackers);

    // convert hacker list to json
    const hackerJson = JSON.stringify(validatedHackers);
    const pathToWrite = path.resolve(
      __dirname,
      "../",
      "data",
      "json_outputs",
      "fromMongoDB.json"
    );
    fs.writeFileSync(pathToWrite, hackerJson);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  return validatedHackers;
}

// used for parsing hacker data into a uniform, correct, format
function parseAndFormatHacker(item : any) {
  // reformatting postAcceptanceResponses fields
  item = { ...item, ...item.postAcceptanceResponses };
  delete item.postAcceptanceResponses;
  // adding all hackers to list
  validHackers.push(item);
}

// returns valid hacker list
function validateHackers(hackers : Hacker[]) : Hacker[]{
  if (hackers === null) {
    console.warn(
      "Oopsie daisy, something went wrong when querying for valid hackers!"
    );
    return [];
  } else if (hackers.length === 0) {
    console.warn("Oopsie daisy, no such hackers were found!");
  }

  // ensures that hackers have non-empty email field
  // !! checks if value is null or empty string
  hackers.filter((hacker) => !!hacker.email);
  return hackers;
}


export default grabFromDatabase;
