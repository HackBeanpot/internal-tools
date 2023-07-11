import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

const getSortedHackers = async () => {
    const rawHackerData = await sortedHackersDao.getSortedHackers();
    const sortedHackers = rawHackerData.map(hackerData => {
      const applicationResponses = hackerData.applicationResponses;
      Object.keys(applicationResponses).forEach((key, keyIndex) => {
        applicationResponses["question" + keyIndex] = applicationResponses[key]
        delete applicationResponses[key]
      })
      return { ...applicationResponses,
        id: hackerData._id,
        email: hackerData.email
      }
    })
    return sortedHackers;
};

const createSortedHacker = async (hacker : any) => {
    const createResponse = await sortedHackersDao.createdSortedHacker(hacker)
    return createResponse;
  };
  
export default {getSortedHackers, createSortedHacker};