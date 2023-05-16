// constants for cabin size and number of questions
const CABIN_SIZE = 5
const NUM_QUESTIONS = 16

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
  Question15: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5'],
  Question16: ['answer1', 'answer2', 'answer3', 'answer4', 'answer5']
}

// loops through each user row in the given array
// -> for each question: increment count for corresponding cabin
function matchAnswers (data : any[]) {
  data.forEach((member) => {
    const counter = Array<number>(CABIN_SIZE) // each element = a different cabin
    const questionObjects = Object.values(Questions) // answers to questions
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      const answers = questionObjects[i] // answer options
      for (let j = 0; j < answers.length; j++) {
        // finds which answer correlates to the user's answer
        if (answers[j] === member['question' + i.toString()]) {
          counter[j]++
        }
      }
    }

    // create extra column for member that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions = Object.values(Cabins)
    member.assignedCabin = cabinOptions[counter.indexOf(Math.max(...counter))]
  })
}

// sorts hacker into suitable cabin
function hackerSortingAlgo () {
  // example data until we can load the data
  const data: any[] = [
    { id: 0, email: 'ostapenko.d@northeastern.edu', isAdmin: NaN, question0: 'answer1' },
    { id: 1, email: 'ostapenko.d@northeastern.edu', isAdmin: NaN, question1: 'answer2' },
    { id: 2, email: 'ostapenko.d@northeastern.edu', isAdmin: NaN, question2: 'answer3' },
    { id: 3, email: 'ostapenko.d@northeastern.edu', isAdmin: NaN, question3: 'answer4' }
  ]

  matchAnswers(data)
  console.log(data[0].assignedCabin) // Cabin1
  console.log(data[1].assignedCabin) // Cabin2
  console.log(data[2].assignedCabin) // Cabin3
  console.log(data[3].assignedCabin) // Cabin4
  // TODO:
  // export cabin data csv -> convert to object
  // export hacker data csv -> convert to object
  // export answer data csv -> convert to object
  // need to make sure cabin capacity is not exceeded
}

export default hackerSortingAlgo
