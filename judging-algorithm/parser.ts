import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/lib/sync'
import { HackerTeam, Judge, Room } from './types'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

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
