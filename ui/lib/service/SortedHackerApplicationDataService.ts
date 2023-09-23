import {
  HackerApplicationDataType
} from '../../models/HackerApplicationData'
import HackerApplicationDataDao from '../dao/HackerApplicationDataDao'

interface FormattedHackerDataType {
  email: string;
  [key: string]: string;
}

interface FormattedHackerWithCabinsDataType extends FormattedHackerDataType {
  assignedCabin: string;
  secondAssignedCabin: string;
}

let answerList: any[]
let cabinList: any[]
const CABIN_SIZE = 5
const QUESTIONS_SIZE = 12

const getAllHackersWithAssignedCabins = async (): Promise<
  FormattedHackerWithCabinsDataType[]
> => {
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

  console.log(answerList, cabinList)

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
  return rawHackerData.map((hackerData) => {
    const { email, applicationResponses } = hackerData
    const initialHackerData: FormattedHackerDataType = {
      email
    }

    function formatApplicationResponses (
      accumulatedResponse: FormattedHackerDataType,
      currentResponseKey: any,
      currentResponseIndex: number
    ) {
      const currentResponseQuestionKey = 'question' + currentResponseIndex
      accumulatedResponse[currentResponseQuestionKey] =
        applicationResponses[currentResponseKey]
      return accumulatedResponse
    }

    return Object.keys(applicationResponses).reduce(
      formatApplicationResponses,
      initialHackerData
    )
  })
}

function matchAnswers (
  formattedHackerData: FormattedHackerDataType[]
): FormattedHackerWithCabinsDataType[] {
  const formattedHackerWithCabinsData: FormattedHackerWithCabinsDataType[] = []
  formattedHackerData.forEach((hacker: FormattedHackerDataType) => {
    const hackerWithCabins = {
      ...hacker,
      assignedCabin: '',
      secondAssignedCabin: ''
    }
    // each element = a different cabin, all initialized to 0
    const cabinScore = Array<number>(CABIN_SIZE).fill(0)

    hydrateCabinScore(hackerWithCabins, cabinScore)

    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions: string[] = Object.values(cabinList)
    const maxIndex: number = cabinScore.indexOf(Math.max(...cabinScore))
    hackerWithCabins.assignedCabin = cabinOptions[maxIndex]

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = cabinScore.slice()
    counterCopy[maxIndex] = -1
    hackerWithCabins.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))]

    formattedHackerWithCabinsData.push(hackerWithCabins)
  })
  return formattedHackerWithCabinsData
}

// Increment the given hacker's given cabinScore each time their answer
// matches the Cabin's answer
function hydrateCabinScore (
  hacker: FormattedHackerWithCabinsDataType,
  cabinScore: number[]
) {
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
        cabinScore[cabinIndex]++
      }
    }
  })
}
