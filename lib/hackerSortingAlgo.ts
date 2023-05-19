import path, { dirname } from 'path'
import fs from 'fs'
import { parse } from 'csv-parse/lib/sync'

// const fs = require('fs')
// const {parse} = require('csv-parse/sync')
// import { fileURLToPath } from 'url'


interface Hacker {
  id: number,
  email: string,
  question0: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  question5: string,
  question6: string,
  question7: string,
  question8: string,
  question9: string
}

// desired answers for each cabin
// e.g  question: ["answer1", "answer2", "answer3", "answer4", "answer5"]
interface AnswerOptions {
  question : string[]
}

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = dirname(__filename)

// parse csv file into an array
function loadCSV<T> (filepath: string) : T[] {
  // const csvFileAbsolutePath = path.resolve(__dirname, filepath)

  // const fileContent = fs.readFileSync('hackerData.csv', { encoding: 'utf-8' })
  // const options = {
  //   delimiter: ',',
  //   columns: true
  // }
  // return parse(fileContent, options)
  console.log("Finishing loading");
  return [];
}

function convertHackerToData (hackerList : Hacker[]) : any[] {
  const allHackerData : any[] = []
  hackerList.forEach(hacker => {
    const hackerData = {
      id: hacker.id,
      email: hacker.email,
      question0: hacker.question0,
      question1: hacker.question1,
      question2: hacker.question2,
      question3: hacker.question3,
      question4: hacker.question4,
      question5: hacker.question5,
      question6: hacker.question6,
      question7: hacker.question7,
      question8: hacker.question8,
      question9: hacker.question9
    }
    allHackerData.push(hackerData)
  })
  return allHackerData
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
const question0 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question1 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question2 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question3 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question4 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question5 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question6 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question7 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question8 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }
const question9 : AnswerOptions =
 { question: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'] }

const allAnswers : AnswerOptions[] = [
  // questionID : Cabin1, Cabin2, Cabin3, Cabin4, Cabin5
  question0,
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
  question8,
  question9
]

// array of array of answers (array of each cabin containing answers)
// const allAnswers = loadCSV<AnswerOptions>('post-acceptance.csv')

// constants for cabin size and number of questions
const CABIN_SIZE = Object.keys(Cabins).length

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin
function matchAnswers (data: any[]) {
  // allAnswers => [AnswerObject, AnswerObject, AnswerObject]
  // const questionObjects = Object.values(allAnswers) // answers to questions

  data.forEach((hacker : any, hackerIndex : number) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)

    // loops through each cabin Answer
    allAnswers.forEach((questionAnswers : AnswerOptions, answersIndex : number) => {
      const answerList : string[] = questionAnswers.question
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
    console.log(`${hacker}'s cabin counter : ${counter}`)
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
  console.log('attempting to write to file')
}

// sorts hacker into suitable cabin
function hackerSortingAlgo () {
  const hackerList = loadCSV<Hacker>('hackerData.csv')
  const hackerData = convertHackerToData(hackerList)
  matchAnswers(hackerData)
  printMembers(hackerData)
  writeDataToFile(hackerData)
  // Cabin4
  // TODO:
  // export cabin data csv -> convert to object
  // export hacker data csv -> convert to object
  // export answer data csv -> convert to object
  // need to make sure cabin capacity is not exceeded
}

hackerSortingAlgo()

//export default hackerSortingAlgo
