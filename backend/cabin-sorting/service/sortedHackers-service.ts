import { Types } from "mongoose";
import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

interface HackerDataType {
  id: string,
  email: string,
  [key: string] : string,
}

const getSortedHackers = async () => {
    const rawHackerData = await sortedHackersDao.getSortedHackers();
    const formattedHackerData = rawHackerData.map(hackerData => {
      const {_id, email, applicationResponses} = hackerData
      const initialHackerData : HackerDataType = {
        id: _id.toString(),
        email: email,
      }

      function formatApplicationResponses(accumulatedResponse : HackerDataType, currentResponseKey : any, currentResponseIndex : number) {
        const currentResponseQuestionKey = "question" + currentResponseIndex;
        accumulatedResponse[currentResponseQuestionKey] = applicationResponses[currentResponseKey]
        return accumulatedResponse
      }

      return Object.keys(applicationResponses).reduce(formatApplicationResponses, initialHackerData)
    })
    return formattedHackerData;
};

const createSortedHacker = async (hacker : any) => {
  const createResponse = await sortedHackersDao.createdSortedHacker(hacker)
  return createResponse;
};
  
export default {getSortedHackers, createSortedHacker};