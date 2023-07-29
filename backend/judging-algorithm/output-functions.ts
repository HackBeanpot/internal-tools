import fs from 'fs';
import path from 'path';
import { HackerOutput, JudgeOutputLiveSite } from './types.js';
import hackerTableModel from './data/models/hackerTable-models.js'
import judgeTableModel from './data/models/judgeTable-models.js'


const hackerJsonPath = path.resolve(__dirname, './data/json_outputs/hackerResults.json');
const judgeJsonPath = path.resolve(__dirname, './data/json_outputs/judgeResults.json');

export async function readJsonAndCreateInMongo() {
  // Read hacker JSON
  const hackerJson = fs.readFileSync(hackerJsonPath, { encoding: 'utf-8' });
  const hackerData: HackerOutput[] = JSON.parse(hackerJson);

  // Read judge JSON
  const judgeJson = fs.readFileSync(judgeJsonPath, { encoding: 'utf-8' });
  const judgeData: JudgeOutputLiveSite[] = JSON.parse(judgeJson);

  // Create hacker entries in MongoDB
  for (const hacker of hackerData) {
    await hackerTableModel.create(hacker);
  }

  // Create judge entries in MongoDB
  for (const judge of judgeData) {
    await judgeTableModel.create(judge);
  }

  console.log('Data successfully inserted into MongoDB');
}

readJsonAndCreateInMongo().catch((error) => {
  console.error('Failed to insert data into MongoDB', error);
});