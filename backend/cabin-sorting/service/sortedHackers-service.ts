import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { Types } from 'mongoose';
import * as sortedHackersDao from '../dao/sortedHackers-dao.js';
import { FormattedHacker, Hacker } from '../types.js';
import sortedHackersSchema from '../schemas/sortedHackers-schema.js';

let CABIN_SIZE: number;
let QUESTIONS_SIZE: number;
let hackerList: HackerDataType[];
let answerList: string[];
let cabinList: string[];

interface HackerDataType {
  id: string;
  email: string;
  [key: string]: string;
}

const getSortedHackers = async (): Promise<HackerDataType[]> => {
  const rawHackerData = await sortedHackersDao.getSortedHackers();
  const formattedHackerData = rawHackerData.map((hackerData) => {
    const { _id, email, applicationResponses } = hackerData;
    const initialHackerData: HackerDataType = {
      id: _id.toString(),
      email: email
    };

    function formatApplicationResponses(
      accumulatedResponse: HackerDataType,
      currentResponseKey: any,
      currentResponseIndex: number
    ) {
      const currentResponseQuestionKey = 'question' + currentResponseIndex;
      accumulatedResponse[currentResponseQuestionKey] =
        applicationResponses[currentResponseKey];
      return accumulatedResponse;
    }

    return Object.keys(applicationResponses).reduce(
      formatApplicationResponses,
      initialHackerData
    );
  });
  return formattedHackerData;
};

const createSortedHacker = async (hacker: Hacker): Promise<Hacker> => {
  const createResponse = await sortedHackersDao.createdSortedHacker(hacker);
  return createResponse;
};

const groupHackersByCabin = async (): Promise<string[][]> => {
  const hackers = await assignHackerCabins();
  let cabinEmails: string[][] = [];


  const groupedHackers = hackers.reduce((accum, hacker) => {
    const {assignedCabin, email} = hacker
    const cabinNum = cabinList.indexOf(assignedCabin);
    if (cabinNum === -1) {
      console.error(
        `Cabin assigned to Hacker ${assignedCabin.id} could not be found`
      );
      return accum;
    }
    if (!accum[cabinNum]) {
      accum[cabinNum] = []
    }
    accum[cabinNum].push(email);
    
    return accum;
  }, cabinEmails);

  return groupedHackers
};

function loadCSV(filepath: string, headers: boolean): any[] {
  const csvFileAbsolutePath = path.resolve(
    'cabin-sorting',
    'data', 
    'csv_inputs', 
    filepath);

  // error handling in case file is missing
  let fileContent;
  try {
    fileContent = fs.readFileSync(csvFileAbsolutePath, {
      encoding: 'utf-8'
    });
  } catch (err) {
    console.log(`File cannot be found: "${filepath}"`);
    return [];
  }

  const options = {
    delimiter: ',',
    columns: headers
  };
  return parse(fileContent, options);
}

async function assignHackerCabins() {
  hackerList = await getSortedHackers();
  answerList = loadCSV('answer.csv', true);
  cabinList = loadCSV('cabinTypes.csv', false)[0];

  CABIN_SIZE = Object.keys(cabinList).length;
  QUESTIONS_SIZE = Object.keys(answerList[0]).length;

  // ensuring the CSV files exists before continuing
  if (
    hackerList.length === 0 ||
    answerList.length === 0 ||
    cabinList.length === 0
  ) {
    console.error(
      'Please add the respective csv file(s) to the folder to run the sorting algorithm'
    );
    return [];
  } else {
    matchAnswers();
    return hackerList;
  }
}

function matchAnswers() {
  hackerList.forEach((hacker: any) => {
    // each element = a different cabin, all initialized to 0
    const cabinScore = Array<number>(CABIN_SIZE).fill(0);

    incrementCabinScores(hacker, cabinScore);

    // create extra column for hacker that determines the cabin they should
    // join (the one with the most points)
    const cabinOptions: string[] = Object.values(cabinList);
    const maxIndex: number = cabinScore.indexOf(Math.max(...cabinScore));
    hacker.assignedCabin = cabinOptions[maxIndex];

    // find backup cabin for hacker (in case the first choice fills up)
    const counterCopy = cabinScore.slice();
    counterCopy[maxIndex] = -1;
    hacker.secondAssignedCabin =
      cabinOptions[counterCopy.indexOf(Math.max(...counterCopy))];
  });
}

function incrementCabinScores(hacker: any, cabinScore: number[]) {
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
        cabinScore[cabinIndex]++;
      }
    }
  });
}

export default { getSortedHackers, createSortedHacker, groupHackersByCabin };
