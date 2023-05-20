const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')

// import fs from 'fs'
// import { parse } from 'csv-parse/lib/sync'
// import path from 'path'

// interface Hacker {
//   id: number,
//   email: string,
//   question0: string,
//   question1: string,
//   question2: string,
//   question3: string,
//   question4: string,
//   question5: string,
//   question6: string,
//   question7: string,
//   question8: string,
//   question9: string
// }

// desired answers for each cabin
// e.g  question: ["answer1", "answer2", "answer3", "answer4", "answer5"]
// interface AnswerOptions {
//   question : string[]
// }

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

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

// An object of all of the questions with their respective answers
// const question0 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question1 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question2 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question3 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question4 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question5 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question6 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question7 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question8 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
// const question9 : AnswerOptions =
//  { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }

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


// const allAnswers : AnswerOptions[] = [
//   // questionID : Cabin1, Cabin2, Cabin3, Cabin4, Cabin5
//   question0,
//   question1,
//   question2,
//   question3,
//   question4,
//   question5,
//   question6,
//   question7,
//   question8,
//   question9
// ]

// array of array of answers (array of each cabin containing answers)
// const allAnswers = loadCSV<AnswerOptions>('post-acceptance.csv')

// constants for cabin size and number of questions
const CABIN_SIZE = Object.keys(Cabins).length

// // loops through each user row in the given array
// // -> for each question: increment count for corresponding cabin
// function matchAnswers (data: any[]) {
//   // allAnswers => [AnswerObject, AnswerObject, AnswerObject]
//   // const questionObjects = Object.values(allAnswers) // answers to questions

//   data.forEach((hacker : any, hackerIndex : number) => {
//     // each element = a different cabin, all initialized to 0
//     const counter = Array<number>(CABIN_SIZE).fill(0)

//     // loops through each cabin Answer
//     allAnswers.forEach((questionAnswers : AnswerOptions, answersIndex : number) => {
//       const answerList : string[] = questionAnswers.question
//       answerList.forEach((cabinType : string, cabinTypeIndex : number) => {
//         if (cabinType === hacker['question' + answersIndex.toString()]) {
//           counter[cabinTypeIndex]++
//         }
//       })
//     })

//     // create extra column for hacker that determines the cabin they should
//     // join (the one with the most points)
//     const cabinOptions = Object.values(Cabins)
//     hacker.assignedCabin = cabinOptions[counter.indexOf(Math.max(...counter))]
//     console.log(`${hacker.email}'s cabin counter : ${counter}`)
//   })
// }


// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin
function matchAnswers (data: any[]) {
  // allAnswers => [AnswerObject, AnswerObject, AnswerObject]
  // const questionObjects = Object.values(allAnswers) // answers to questions
  const allAnswers : any[] = getAnswerOptions()

  data.forEach((hacker : any, hackerIndex : number) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)
    // const allAnswers : any[] = getAnswerOptions()

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
    const cabinOptions = Object.values(Cabins)
    hacker.assignedCabin = cabinOptions[counter.indexOf(Math.max(...counter))]
    console.log(`${hacker.email}'s cabin counter : ${counter}`)
  })
}

function printMembers (data: any[]) {
  data.forEach((member) => {
    console.log(
      `ID: ${member.id} | EMAIL: ${member.email} | assignedCabin: ${member.assignedCabin}`
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
