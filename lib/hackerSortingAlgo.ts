const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

// parse csv file into an array
function loadCSV (filepath: string) {
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

// NEW: retrieves cabin answers for each question from answer.csv
// ex: question0: answer1,answer2,answer3,answer4,answer5
//     question1: answer1,answer2,answer3,answer4,answer5
 function getAnswerOptions() : any[] {
  const answersData : any[] = loadCSV('answer.csv')
  const allAnswers : any[] = []
  for (let questionIndex = 0; questionIndex< 10; questionIndex++ ){
    var questionList : string[] = []
    answersData.forEach((cabin : any, cabinIndex : number) => {
      questionList.push(cabin["question" + questionIndex.toString()])
    })
    allAnswers.push(questionList)
  }
  return allAnswers
 }

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin
function matchAnswers (data: any[]) {
  const allAnswers : any[] = getAnswerOptions()

  data.forEach((hacker : any, hackerIndex : number) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)


    // loops through each cabin Answer
    allAnswers.forEach((questionAnswers : string[], answersIndex : number) => {
      const answerList : string[] = questionAnswers
      answerList.forEach((cabinType : string, cabinTypeIndex : number) => {
        if (cabinType === hacker['question' + answersIndex.toString()]) {
          counter[cabinTypeIndex]++
        }
      })
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