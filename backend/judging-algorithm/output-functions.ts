import { deleteAndPostData } from './parser-functions.js';
import hackerData from './data/json_outputs/hackerResults.json' assert { type: "json" }
import judgeData from './data/json_outputs/judgeResults.json' assert { type: "json" }

const hackerJsonPath = './data/json_outputs/hackerResults.json';
const judgeJsonPath = './data/json_outputs/judgeResults.json';

export async function readJsonAndCreateInMongo() {
  // Create hacker entries in MongoDB
  deleteAndPostData('hackerTable', hackerData)
  // Create judge entries in MongoDB
  deleteAndPostData('judgeTable', judgeData)
  console.log('Data successfully inserted into MongoDB');
}

readJsonAndCreateInMongo().catch((error) => {
  console.error('Failed to insert data into MongoDB', error);
});

