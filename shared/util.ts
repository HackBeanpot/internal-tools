import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

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

export function writeDataToJSONFile (dataList : any[], jsonFileName: string) {
  const tables = JSON.stringify(dataList)
  const pathToWrite = path.resolve(
    'data',
    'json_outputs',
    jsonFileName
  )
  fs.writeFileSync(pathToWrite, tables)
}