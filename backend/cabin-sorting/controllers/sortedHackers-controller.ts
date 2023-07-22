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

const getGroupedHackers = async (_req: any, res: any) => {
  const groupedHackers = await sortedHackersService.getGroupedHackers()
  res.json(groupedHackers)
  return groupedHackers
}

export default {getSortedHackers, createSortedHacker, getGroupedHackers };