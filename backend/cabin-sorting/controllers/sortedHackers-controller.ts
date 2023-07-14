import sortedHackersService from "../service/sortedHackers-service.js";


const getSortedHackers = async (_req: any, res: any) => {
  const sortedHackers = await sortedHackersService.getSortedHackers();
  res.json(sortedHackers)
  return sortedHackers;
};

const createSortedHacker = async (req: any, res: any) => {
  const hackerInformation = req.body;
  const createResponse = await sortedHackersService.createSortedHacker(hackerInformation)
  res.json(createResponse)
  return createResponse;
};

export default {getSortedHackers, createSortedHacker};