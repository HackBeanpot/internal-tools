import grabFromDatabase from './api/sortingData'
import { loadCSV, writeDataToFile, printMembers } from './lib/util'

let hackerList: Hacker[]
let answerList: any[]
let cabinList: any[]
let questionHeaders: any[]
let CABIN_SIZE: number
let QUESTIONS_SIZE: number

export type Hacker = {
   _id: string,
    email: string,
    firstName: string,
    lastName: string,
    adult: string,
    adultSignature: string,
    minorSignature: string,
    guardianSignature: string,
    proofOfVaccination: string[],
    hangingWithFriends: string,
    zombieApocalypse: string,
    takeOverNation: string,
    aspirations: string,
    study: string,
    stuckInElevator: string,
    club: string,
    socialMedia: string,
    duringClass: string,
    assignedCabin: string,
    secondAssignedCabin: string,
    postAcceptanceResponses: any
}

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin if answers match
function matchAnswers () {
  hackerList.forEach((hacker: Hacker) => {
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
    hacker.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    // show their score for each cabin (useful for testing purposes)
    console.log(`${hacker.email}'s cabin counter: ${cabinScore}`)
  })
}

// Increment the given hacker's given cabinScore each time their answer
// matches the Cabin's answer
function hydrateCabinScore (hacker: Hacker, cabinScore: number[]) {
  questionHeaders.forEach((questionTitle, questionTitleIndex) => {
    type HackerProperty = keyof typeof hacker
    const questionTitleProperty = questionTitle as HackerProperty
    const hackersAnswer: string = hacker[questionTitleProperty].toLowerCase().trim();
    answerList.forEach((cabin: any, cabinIndex: number) => {
      if (cabin[questionTitleIndex].toLowerCase().trim() === hackersAnswer.toLowerCase().trim()) {
        cabinScore[cabinIndex]++
      }
    })
  })
}

// Assigns two cabins to each Hacker.
// assignedCabin = the cabin a Hacker is best suited to
// secondAssignedCabin = their next best cabin option
async function hackerSortingAlgo () {
  // variable values first declared globally within the file and initialized on runtime
  hackerList = await grabFromDatabase()
  answerList = loadCSV('answer.csv', false, ',')
  cabinList = loadCSV('cabinTypes.csv', false, ',')[0]
  questionHeaders = loadCSV('questionHeaders.csv', false, ",")[0]

  CABIN_SIZE = Object.keys(cabinList).length

  // ensuring the CSV files exists before continuing
  if (
    hackerList.length === 0 ||
    answerList.length === 0 ||
    cabinList.length === 0
  ) {
    console.log(
      'Please add the respective csv file(s) to the folder to run the sorting algorithm'
    )
  } else {
    matchAnswers()
    printMembers(hackerList)
    writeDataToFile(hackerList)
  }
}

// let's get sorting!!
hackerSortingAlgo()