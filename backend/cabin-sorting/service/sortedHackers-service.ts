import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

const getSortedHackers = async () => {
    const sortedHackers = await sortedHackersDao.getSortedHackers();
    console.log(sortedHackers);
    return sortedHackers;
};

const createSortedHacker = async (hacker : any) => {
    const createResponse = await sortedHackersDao.createdSortedHacker(hacker)
    return createResponse;
  };
  
export default {getSortedHackers, createSortedHacker};