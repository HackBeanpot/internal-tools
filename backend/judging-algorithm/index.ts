import { FinalOutputTables, HackerTeam, Judge, Room, RotationTime } from './types.js'
import { sortJudgesAndPeople } from './formSchedule.js'
import { parseHackerTeamCSV, parseJudgeCSV, parseRoomsCSV, parseRotationTimeCSV } from './parser.js'
import { convertHackersTablesToJson, convertJudgesTablesToJson } from './formJsonOutput.js'
import { updateAllData } from './parser.js'
import {readJsonAndCreateInMongo} from './output-functions.js'

// hardcode based on hackathon needs
const allTimes: string[] =
 ['10:00', '10:09', '10:18', '10:27', '10:36', '10:45', '10:54', '11:03', '11:12', '11:21']

function main (): FinalOutputTables {
  // read the CSV files with judge / hacker / room data
  const judgeCsvFilePath = '../judging-algorithm/data/csv_inputs/judges.csv'
  const roomsCsvFilePath = '../judging-algorithm//data/csv_inputs/rooms.csv'
  const teamsCsvFilePath = '../judging-algorithm/data/csv_inputs/hackers.csv'
  const rotationTimesCsvFilePath = '../judging-algorithm/data/csv_inputs/rotationTimes.csv'

  // uploads the csv data to mongo
  updateAllData();

  // uploads the output data to mongo
  readJsonAndCreateInMongo();

  // parse the hacker CSV in to TS objects
  const allJudges: Judge[] = parseJudgeCSV(judgeCsvFilePath)
  const allRooms: Room[] = parseRoomsCSV(roomsCsvFilePath)
  const allHackers: HackerTeam[] = parseHackerTeamCSV(teamsCsvFilePath)
  const allRotationTimes: RotationTime[] = parseRotationTimeCSV(rotationTimesCsvFilePath)

  // apply constraints to parsed data
  const allAwardEligibleHackers = allHackers.filter(team => team.liveDemo === 'yes')

  // extract string names for: judges, hackers and teams
  const judgeStringsForSorting = allJudges.map(judge => judge.name)

  // make a judgeStrings copy because the sorting version is mutable
  const judgeStringsForJSON = Object.assign([], judgeStringsForSorting)

  // handles randomized placement and outputs a judge table and a hacker table for front-end
  const allPeopleSorted =
  sortJudgesAndPeople(allTimes, allRooms, allAwardEligibleHackers, judgeStringsForSorting)

  // parse the judgeOutput and place in JSON files for the front-end to consume
  convertHackersTablesToJson(allPeopleSorted)
  convertJudgesTablesToJson(judgeStringsForJSON, allPeopleSorted)

  return allPeopleSorted
}

main()
