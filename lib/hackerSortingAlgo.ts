const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

// parse csv file into an array
function loadCSV (filepath: string) : any[] {
  const csvFileAbsolutePath = path.resolve(__dirname, 'data', filepath)

  const fileContent = fs.readFileSync(csvFileAbsolutePath, { encoding: 'utf-8' })
  const options = {
    delimiter: ',',
    columns: true
  }
  return parse(fileContent, options)
}

// All of the assignable cabins
const Cabins = {
  Cabin1: 'Cabin1',
  Cabin2: 'Cabin2',
  Cabin3: 'Cabin3',
  Cabin4: 'Cabin4',
  Cabin5: 'Cabin5'
}

// constants for cabin size and number of questions
const CABIN_SIZE = Object.keys(Cabins).length

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin if answers match
function matchAnswers (data: any[]) {

  data.forEach((hacker : any, hackerIndex : number) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)

      const answersData : any[] = loadCSV('answer.csv')
      answersData.forEach((cabin : any, cabinIndex : number) => {
        for (let questionIndex = 0; questionIndex < 10; questionIndex++) {
          if (cabin['question' + questionIndex.toString()] === hacker['question' + questionIndex.toString()]) {
            counter[cabinIndex]++
          }
        }
    })
    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions : string[] = Object.values(Cabins)
    const maxIndex : number = counter.indexOf(Math.max(...counter))
    hacker.assignedCabin = cabinOptions[maxIndex]

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = Array<number>(CABIN_SIZE).fill(0)
    counterCopy[maxIndex] = -1
    hacker.secondAssignedCabin = cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    console.log(`${hacker.email}'s cabin counter : ${counter}`)
  })
}

function printMembers (data: any[]) {
  data.forEach((member) => {
    console.log(
      `ID: ${member.id} | EMAIL: ${member.email} | assignedCabin: ${member.assignedCabin} | secondAssignedCabin: ${member.secondAssignedCabin}`
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
  const hackerList = loadCSV('hackerData.csv')
  matchAnswers(hackerList)
  printMembers(hackerList)
  writeDataToFile(hackerList)
}

hackerSortingAlgo()

// export default hackerSortingAlgo