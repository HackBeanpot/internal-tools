import sortedHackersService from "../service/sortedHackers-service.js";


const getSortedHackers = async (_req: any, res: any) => {
  const rawHackerData = await sortedHackersService.getSortedHackers();
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
  res.json(sortedHackers)
  return sortedHackers;
};

const createSortedHacker = async (req: any, res: any) => {
  const sortedHacker = req.body;
  const createResponse = await sortedHackersService.createSortedHacker(sortedHacker)
  res.json(createResponse)
  return createResponse;
};

export default {getSortedHackers, createSortedHacker};