const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

// parse csv file into an array
function loadCSV (filepath: string): any[] {
  const csvFileAbsolutePath = path.resolve(__dirname, 'data', filepath)

  // error handling in case file is missing
  let fileContent
  try {
    fileContent = fs.readFileSync(csvFileAbsolutePath, {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.log(`File cannot be found : "${filepath}"`)
    return []
  }

  const options = {
    delimiter: ',',
    columns: true
  }
  return parse(fileContent, options)
}

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin if answers match
function matchAnswers (hackerList: any[], answerList: any[], cabinList: any[]) {
  // constants for cabin size and number of questions
  const CABIN_SIZE = Object.keys(cabinList).length
  const QUESTIONS_SIZE = Object.keys(answerList[0]).length
  hackerList.forEach((hacker: any, hackerIndex: number) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)

    answerList.forEach((cabin: any, cabinIndex: number) => {
      for (
        let questionIndex = 0;
        questionIndex < QUESTIONS_SIZE;
        questionIndex++
      ) {
        if (
          cabin['question' + questionIndex.toString()] ===
          hacker['question' + questionIndex.toString()]
        ) {
          counter[cabinIndex]++
        }
      }
    })
    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions: string[] = Object.values(cabinList)
    const maxIndex: number = counter.indexOf(Math.max(...counter))
    hacker.assignedCabin = cabinOptions[maxIndex]

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = Array<number>(CABIN_SIZE).fill(0)
    counterCopy[maxIndex] = -1
    hacker.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    console.log(`${hacker.email}'s cabin counter : ${counter}`)
  })
}

function printMembers (data: any[]) {
  data.forEach((member) => {
    console.log(
      `ID: ${member.id} 
      | EMAIL: ${member.email} 
      | assignedCabin: ${member.assignedCabin} 
      | secondAssignedCabin: ${member.secondAssignedCabin}`
    )
  })
}

function writeDataToFile (data: any[]) {
  const hackerTables = JSON.stringify(data)
  const pathToWrite = path.resolve(__dirname, 'data', 'sortedHackers.json')
  fs.writeFileSync(pathToWrite, hackerTables)
}

// sorts hacker into suitable cabin
function hackerSortingAlgo () {
  const hackerList: any[] = loadCSV('hackerData.csv')
  const answerList: any[] = loadCSV('answer.csv')
  const cabinList: any[] = loadCSV('cabinTypes.csv')

  if (hackerList.length === 0 || answerList.length === 0 || cabinList.length === 0) {
    console.log(
      'Please add the respective csv file(s) to the folder to run the sorting algortihm'
    )
  } else {
    matchAnswers(hackerList, answerList, cabinList[0])
    printMembers(hackerList)
    writeDataToFile(hackerList)
  }
}

hackerSortingAlgo()

// export default hackerSortingAlgo
