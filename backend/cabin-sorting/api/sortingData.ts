import path from "path";
import fs from "fs";
import { client, connectToDatabase } from "./connectMongo";
import { Hacker } from "../hackerSortingAlgo";

let validatedHackers : Hacker[] = [];
const validHackers : Hacker[] = [];
const collectionName : string = process.env.MONGO_DB_COLLECTION!;

async function applicantDataAsJson() {
  const applicantData = await connectToDatabase(collectionName);

  try {
    const query = {
      applicationStatus: "Submitted",
      postAcceptanceResponses: { $exists: true },
      isAdmin: false,
      rsvpStatus: "Confirmed",
      "postAcceptanceResponses.swag": { $exists: false },
      "postAcceptanceResponses.club": { $exists: true },
    };

    const hackerDataCursor = applicantData
      .find(query)
      .project({ email: 1, postAcceptanceResponses: 1 });


    const hackerDocuments = await hackerDataCursor.toArray();
    hackerDocuments.map((item : any) => parseHackerFromDB({ ...item, ...item.postAcceptanceResponses }));
    validatedHackers = getValidHackers(validHackers);

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
    await client.close();
  }
  return validatedHackers;
}

function parseHackerFromDB(item : Hacker) {
  delete item.postAcceptanceResponses;
  validHackers.push(item);
}

function getValidHackers(hackers : Hacker[]) : Hacker[]{
  if (hackers === null) {
    console.warn(
      "Oopsie daisy, something went wrong when querying for valid hackers!"
    );
    return [];
  } else if (hackers.length === 0) {
    console.warn("Oopsie daisy, no such hackers were found!");
  }

  hackers.filter((hacker) => !!hacker.email);
  return hackers;
}

export default applicantDataAsJson;