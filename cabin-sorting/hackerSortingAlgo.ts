import * as fs from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

let hackerList: any[]
let answerList: any[]
let cabinList: any[]
let CABIN_SIZE: number
let QUESTIONS_SIZE: number

// parse csv file into an array
function loadCSV (filepath: string, headers: boolean): any[] {
  const csvFileAbsolutePath = path.resolve(__dirname, 'data', 'csv_inputs', filepath)

  // error handling in case file is missing
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
    delimiter: ',',
    columns: headers
  }
  return parse(fileContent, options)
}

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin if answers match
function matchAnswers () {
  // constants for cabin size and number of questions
  hackerList.forEach((hacker: any) => {
    // each element = a different cabin, all initialized to 0
    const cabinScore = Array<number>(CABIN_SIZE).fill(0)

    hydrateCabinScore(hacker, cabinScore)
    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions: string[] = Object.values(cabinList)
    const maxIndex: number = cabinScore.indexOf(Math.max(...cabinScore))
    hacker.assignedCabin = cabinOptions[maxIndex]

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = cabinScore.slice()
    counterCopy[maxIndex] = -1
    hacker.secondAssignedCabin = cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    console.log(`${hacker.email}'s cabin counter: ${cabinScore}`)
  })
}

function hydrateCabinScore (hacker: any, cabinScore: number[]) {
  answerList.forEach((cabin: any, cabinIndex: number) => {
    for (let questionIndex = 0; questionIndex < QUESTIONS_SIZE; questionIndex++) {
      if (
        cabin['question' + questionIndex.toString()] ===
        hacker['question' + questionIndex.toString()]
      ) {
        cabinScore[cabinIndex]++
      }
    }
  })
}

function printMembers () {
  hackerList.forEach((member) => {
    console.log(
      `ID: ${member.id}
      | EMAIL: ${member.email}
      | assignedCabin: ${member.assignedCabin}
      | secondAssignedCabin: ${member.secondAssignedCabin}`
    )
  })
}

function writeDataToFile () {
  const hackerTables = JSON.stringify(hackerList)
  const pathToWrite = path.resolve(__dirname, 'data', 'json_outputs', 'sortedHackers.json')
  fs.writeFileSync(pathToWrite, hackerTables)
}

// sorts hacker into suitable cabin
function hackerSortingAlgo () {
  // variable values first declared globally within the file and initialized on runtime
  hackerList = loadCSV('hackerData.csv', true)
  answerList = loadCSV('answer.csv', true)
  cabinList = loadCSV('cabinTypes.csv', false)[0]

  CABIN_SIZE = Object.keys(cabinList).length
  QUESTIONS_SIZE = Object.keys(answerList[0]).length

  if (hackerList.length === 0 || answerList.length === 0 || cabinList.length === 0) {
    console.log(
      'Please add the respective csv file(s) to the folder to run the sorting algorithm'
    )
  } else {
    matchAnswers()
    printMembers()
    writeDataToFile()
  }
}

hackerSortingAlgo()
