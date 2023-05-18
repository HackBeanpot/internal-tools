// All of the assignable cabins
const Cabins = {
  Cabin1: 'Cabin1',
  Cabin2: 'Cabin2',
  Cabin3: 'Cabin3',
  Cabin4: 'Cabin4',
  Cabin5: 'Cabin5'
}

// An object of all of the questions with their respective answers
const Questions = {
  // questionID : Cabin1, Cabin2, Cabin3, Cabin4, Cabin5
  Question0: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question1: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question2: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question3: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question4: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question5: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question6: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question7: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question8: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question9: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question10: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question11: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question12: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question13: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question14: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question15: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5']
}

// constants for cabin size and number of questions
const CABIN_SIZE = Object.keys(Cabins).length

// NUM_QUESTIONS isnt used because we are going to use
//  a forloop on the actual questionObject itself

// const NUM_QUESTIONS = Object.keys(Questions).length

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin
function matchAnswers (data: any[]) {
  const questionObjects = Object.values(Questions) // answers to questions

  data.forEach((member, memberIndex) => {
    // each element = a different cabin, all initialized to 0
    const counter = Array<number>(CABIN_SIZE).fill(0)

    questionObjects.forEach((answers, answersIndex) => {
      answers.forEach((cabinType, cabinTypeIndex) => {
        if (cabinType === member['question' + answersIndex.toString()]) {
          counter[cabinTypeIndex]++
        }
      })
    })

    // for (let i = 0; i < NUM_QUESTIONS; i++) {
    //   const answers = questionObjects[i]; // answer options
    //   for (let j = 0; j < answers.length; j++) {
    //     // finds which answer correlates to the user's answer
    //     if (answers[j] === member["question" + i.toString()]) {
    //       counter[j]++;
    //     }
    //   }
    // }

    // create extra column for member that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions = Object.values(Cabins)
    member.assignedCabin = cabinOptions[counter.indexOf(Math.max(...counter))]
    console.log(`${memberIndex}'s cabin counter : ${counter}`)
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
  // example data until we can load the data
  const data: any[] = [
    {
      id: 0,
      email: 'test1@northeastern.edu',
      isAdmin: NaN,
      question0: 'answer1',
      question1: 'answer1',
      question2: 'answer1',
      question3: 'answer1',
      question4: 'answer1',
      question5: 'answer2',
      question6: 'answer2',
      question7: 'answer2',
      question8: 'answer2',
      question9: 'answer2',
      question10: 'answer2',
      question11: 'answer2',
      question12: 'answer2',
      question13: 'answer2',
      question14: 'answer2',
      question15: 'answer2'
    },
    {
      id: 1,
      email: 'test2@northeastern.edu',
      isAdmin: NaN,
      question1: 'answer2'
    },
    {
      id: 2,
      email: 'test3@northeastern.edu',
      isAdmin: NaN,
      question2: 'answer3'
    },
    {
      id: 3,
      email: 'test4@northeastern.edu',
      isAdmin: NaN,
      question3: 'answer4'
    }
  ]

  matchAnswers(data)
  printMembers(data)
  writeDataToFile(data)
  // Cabin4
  // TODO:
  // export cabin data csv -> convert to object
  // export hacker data csv -> convert to object
  // export answer data csv -> convert to object
  // need to make sure cabin capacity is not exceeded
}

hackerSortingAlgo()

// export default hackerSortingAlgo
