import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'
import { HackerTeam, Judge, Room, RotationTime } from './types.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import {updateJudgeData, updatesTeamData, updateRoomsData, updateRotationTimes} from './parser-functions.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function parseCsv<T> (csvFilePath: string, headers: string[] | boolean): T[] {
  const csvFileAbsolutePath = path.resolve(__dirname, csvFilePath)

  const fileContent = fs.readFileSync(csvFileAbsolutePath, {
    encoding: 'utf-8'
  })
  const options = {
    delimiter: ',',
    columns: headers
  }
  return parse(fileContent, options)
}

export function parseJudgeCSV (judgeCsvFilePath: string): Judge[] {
  return parseCsv<Judge>(judgeCsvFilePath, true)
}

export function parseHackerTeamCSV (
  hackerTeamCsvFilePath: string
): HackerTeam[] {
  return parseCsv<HackerTeam>(hackerTeamCsvFilePath, true)
}

export function parseRoomsCSV (roomCsvFilePath: string): Room[] {
  return parseCsv<Room>(roomCsvFilePath, true)
}

export function parseRotationTimeCSV (rotationTimesCsvFilePath: string): RotationTime[] {
  return parseCsv<RotationTime>(rotationTimesCsvFilePath, true)
}

async function updateAllData() {
  await updateJudgeData();
  await updateRoomsData();
  await updateRotationTimes();
  await updatesTeamData();
}

updateAllData();