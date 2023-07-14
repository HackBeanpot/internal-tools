import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

const getSortedHackers = async () => {
    const rawHackerData = await sortedHackersDao.getSortedHackers();
    const sortedHackers = rawHackerData.map(hackerData => {
      const {_id, email, applicationResponses} = hackerData
      const initialHackerData = {
        id: _id,
        email
      }

      function formatApplicationResponses(accumulatedResponse : any, currentResponse : string, responseIndex : number) {
        applicationResponses["question" + responseIndex] = applicationResponses[responseIndex]
        delete applicationResponses[responseIndex]
        return {...accumulatedResponse, currentResponse}
      }

      Object.keys(applicationResponses).reduce(formatApplicationResponses, initialHackerData)

    })
    return sortedHackers;
};

const createSortedHacker = async (hacker : any) => {
  const createResponse = await sortedHackersDao.createdSortedHacker(hacker)
  return createResponse;
};
  
export default {getSortedHackers, createSortedHacker};