import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'
import { Hacker } from '../hackerSortingAlgo'

export function loadCSV (filepath: string, headers: boolean, delimiter: string): any[] {
  const csvFileAbsolutePath = path.resolve(
    'data',
    'csv_inputs',
    filepath
  )

  let fileContent
  try {
    fileContent = fs.readFileSync(csvFileAbsolutePath, {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.log(`File cannot be found: "${filepath}"`)
    return []
  }

  const options = {
    delimiter: delimiter,
    columns: headers
  }
  return parse(fileContent, options)
}

export function writeDataToFile (hackerList : Hacker[]) {
  const hackerTables = JSON.stringify(hackerList)
  const pathToWrite = path.resolve(
    'data',
    'json_outputs',
    'sortedHackers.json'
  )
  fs.writeFileSync(pathToWrite, hackerTables)
}

// Print to the console each hacker's information including their top
// two cabin assignments
export function printMembers (hackerList : Hacker[]) {
  hackerList.forEach((member) => {
    console.log(
      `ID: ${member._id}
      | EMAIL: ${member.email}
      | assignedCabin: ${member.assignedCabin}
      | secondAssignedCabin: ${member.secondAssignedCabin}`
    )
  })
}