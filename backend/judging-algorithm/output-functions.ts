import fs from 'fs';
import { HackerOutput, Judge, JudgeOutputLiveSite } from './types.js';
import { deleteAndPostData } from './parser-functions.js';
import { parseCsv } from './parser.js';
import hackerData from './data/json_outputs/hackerResults.json' assert { type: "json" }
import judgeData from './data/json_outputs/judgeResults.json' assert { type: "json" }

const hackerJsonPath = './data/json_outputs/hackerResults.json';
const judgeJsonPath = './data/json_outputs/judgeResults.json';

export async function readJsonAndCreateInMongo() {
  // Read hacker JSON
  // const hackerData: HackerOutput[] = JSON.parse(hackerJson);

  // Read judge JSON
  // const judgeJson = fs.readFileSync(judgeJsonPath, { encoding: 'utf-8' });
  // const judgeData = parseCsv<JudgeOutputLiveSite[]>(judgeJsonPath, false)
  // const judgeData: JudgeOutputLiveSite[] = JSON.parse(judgeJson);

  deleteAndPostData('hackerTable', hackerData)
  deleteAndPostData('judgeTable', judgeData)
  // Create hacker entries in MongoDB

  // Create judge entries in MongoDB


  console.log('Data successfully inserted into MongoDB');
}

readJsonAndCreateInMongo().catch((error) => {
  console.error('Failed to insert data into MongoDB', error);
});

