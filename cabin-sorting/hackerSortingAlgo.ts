import applicantDataAsJson from './api/sortingData'
import { printMembers } from './lib/util'
import {loadCSV, writeDataToJSONFile} from "../shared/util"

let hackerList: Hacker[]
let answerList: any[]
let cabinList: any[]
let questionHeaders: any[]
let CABIN_SIZE: number

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
    postAcceptanceResponses?: any
}

function findBestTwoCabinFits () {
  hackerList.forEach((hacker: Hacker) => {
    const cabinScores = Array<number>(CABIN_SIZE).fill(0)

    calculateCabinScores(hacker, cabinScores)

    const cabinOptions: string[] = Object.values(cabinList)
    const maxIndex: number = cabinScores.indexOf(Math.max(...cabinScores))
    hacker.assignedCabin = cabinOptions[maxIndex]

    // find backup cabin
    const counterCopy = cabinScores.slice()
    counterCopy[maxIndex] = -1
    hacker.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    console.log(`${hacker.email}'s cabin counter: ${cabinScores}`)
  })
}

function calculateCabinScores (hacker: Hacker, cabinScores: number[]) {
  questionHeaders.forEach((questionTitle, questionTitleIndex) => {
    type HackerProperty = keyof typeof hacker
    const questionTitleProperty = questionTitle as HackerProperty
    const hackersAnswer: string = hacker[questionTitleProperty].toLowerCase().trim();
    answerList.forEach((cabin: any, cabinIndex: number) => {
      if (cabin[questionTitleIndex].toLowerCase().trim() === hackersAnswer.toLowerCase().trim()) {
        cabinScores[cabinIndex]++
      }
    })
  })
}

async function hackerSortingAlgo () {
  hackerList = await applicantDataAsJson()
  answerList = loadCSV('answer.csv', false, ',')
  cabinList = loadCSV('cabinTypes.csv', false, ',')[0]
  questionHeaders = loadCSV('questionHeaders.csv', false, ",")[0]

  CABIN_SIZE = Object.keys(cabinList).length

  if (
    hackerList.length === 0 ||
    answerList.length === 0 ||
    cabinList.length === 0
  ) {
    console.log(
      'Please add the respective csv file(s) to the folder to run the sorting algorithm'
    )
  } else {
    findBestTwoCabinFits()
    printMembers(hackerList)
    writeDataToJSONFile(hackerList, "sortedHackers.json")
  }
}

hackerSortingAlgo()