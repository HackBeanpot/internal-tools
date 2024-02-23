import { HackerApplicationDataType } from '../../models/HackerApplicationData'
import HackerApplicationDataDao from '../dao/HackerApplicationDataDao'

interface FormattedHackerDataType {
  email: string;
  [key: string]: string;
}

interface FormattedHackerWithCabinsDataType extends FormattedHackerDataType {
  assignedCabin: string;
  secondAssignedCabin: string;
}

interface HackersInAssignedCabinsType {
  [key: string]: string[];
}

interface SortedHackersReturnType {
  cabins: HackersInAssignedCabinsType;
  hackers: FormattedHackerWithCabinsDataType[];
}

let answerList: any[]
let cabinList: any[]
let questionNameMapping: { [key: string]: string }
const CABIN_SIZE = 5
const QUESTIONS_SIZE = 9

const getAllHackersWithAssignedCabins =
  async (): Promise<SortedHackersReturnType> => {
    await fetch('http://localhost:3000/api/cabinSorting/answerList')
      .then((response) => response.json())
      .then((data) => {
        answerList = data.content
      })

    await fetch('http://localhost:3000/api/cabinSorting/cabinList')
      .then((response) => response.json())
      .then((data) => {
        cabinList = data.content[0]
      })

    await fetch('http://localhost:3000/api/cabinSorting/questionNameMapping')
      .then((response) => response.json())
      .then((data) => {
        questionNameMapping = data
      })

    const rawHackerData = await HackerApplicationDataDao.find()
    const formattedHackerData = formatRawData(rawHackerData)
    return matchAnswers(formattedHackerData)
  }

const pingServer = async (): Promise<void> => {
  for (let i = 1; i <= 3; i++) {
    console.log('Attempting ping to Mongo Server for Hacker Application Data')
    try {
      await HackerApplicationDataDao.pingServer()
      console.log(`Attempt ${i} succeeded`)
      return
    } catch (err) {
      if (i <= 3) {
        console.log(`Attempt ${i} failed`)
        continue
      } else {
        throw err
      }
    }
  }
}

export default {
  getAllHackersWithAssignedCabins,
  pingServer
}

// Helper Functions
function formatRawData (
  rawHackerData: HackerApplicationDataType[]
): FormattedHackerDataType[] {
  return rawHackerData
    .filter(
      (hackerData) =>
        hackerData.decisionStatus === 'Admitted' &&
        hackerData.rsvpStatus === 'Confirmed' &&
        !!hackerData.postAcceptanceResponses
    )
    .map((hackerData) => {
      const { email, postAcceptanceResponses } = hackerData

      let initialHackerData: FormattedHackerDataType = {
        email
      }

      const { firstName, lastName } = postAcceptanceResponses!
      initialHackerData = { ...initialHackerData, firstName, lastName }

      // transform the question name fields to the question mapping ex.
      /*
      zombie: question0,
      study: question1,
      ...
    */
      Object.keys(postAcceptanceResponses!).forEach(
        (acceptanceResponseField) => {
          if (acceptanceResponseField in questionNameMapping) {
            initialHackerData[questionNameMapping[acceptanceResponseField]] =
              postAcceptanceResponses![acceptanceResponseField]
          }
        }
      )

      return initialHackerData
    })
}

function matchAnswers (
  formattedHackerData: FormattedHackerDataType[]
): SortedHackersReturnType {
  const hackersInCabins: HackersInAssignedCabinsType = {}
  const formattedHackerWithCabinsData: FormattedHackerWithCabinsDataType[] = []
  const cabinOptions: string[] = Object.values(cabinList)
  for (const cabinKey of cabinOptions) {
    hackersInCabins[cabinKey] = []
  }

  formattedHackerData.forEach((hacker: FormattedHackerDataType) => {
    const hackerWithCabins = {
      ...hacker,
      assignedCabin: '',
      secondAssignedCabin: ''
    }
    // each element = a different cabin, all initialized to 0
    const cabinScore = Array<number>(CABIN_SIZE).fill(0)

    hydrateCabinScore(hackerWithCabins, cabinScore)
    console.log(cabinScore)
    let sum = 0
    cabinScore.forEach((score) => (sum += score))
    if (sum !== QUESTIONS_SIZE) {
      console.log(hacker)
    }
    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const maxIndex: number = cabinScore.indexOf(Math.max(...cabinScore))
    hackerWithCabins.assignedCabin = cabinOptions[maxIndex] || 'Not Assigned'

    hackersInCabins[cabinOptions[maxIndex]].push(hacker.email)

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = cabinScore.slice()
    counterCopy[maxIndex] = -1
    hackerWithCabins.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))] ||
      'Not Assigned'

    formattedHackerWithCabinsData.push(hackerWithCabins)
  })
  return { cabins: hackersInCabins, hackers: formattedHackerWithCabinsData }
}

// Increment the given hacker's given cabinScore each time their answer
// matches the Cabin's answer
function hydrateCabinScore (
  hacker: FormattedHackerWithCabinsDataType,
  cabinScore: number[]
) {
  // skip first row of answerList because of question name
  answerList.slice(1, -1).forEach((cabin: any, cabinIndex: number) => {
    for (
      let questionIndex = 0;
      questionIndex < QUESTIONS_SIZE;
      questionIndex++
    ) {
      if (
        cabin[questionIndex].trim() ===
        hacker['question' + questionIndex.toString()].trim()
      ) {
        cabinScore[cabinIndex]++
      }
    }
  })
}
