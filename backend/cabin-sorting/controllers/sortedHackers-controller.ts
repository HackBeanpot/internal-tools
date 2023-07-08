import * as sortedHackersDao from "../dao/sortedHackers-dao.js";

const getSortedHackers = async (_req: any, res: any) => {
  const sortedHackers = await sortedHackersDao.getJudge();
  res.json(sortedHackers)
  return sortedHackers;
};

export default {getSortedHackers};