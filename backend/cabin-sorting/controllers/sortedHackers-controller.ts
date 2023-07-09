import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

const getSortedHackers = async (_req: any, res: any) => {
  const sortedHackers = await sortedHackersDao.getSortedHackers();
  res.json(sortedHackers)
  return sortedHackers;
};

const createSortedHacker = async (req: any, res: any) => {
  const sortedHacker = req.body;
  const createResponse = await sortedHackersDao.createdSortedHacker(sortedHacker)
  res.json(createResponse)
  return createResponse;
};

export default {getSortedHackers, createSortedHacker};