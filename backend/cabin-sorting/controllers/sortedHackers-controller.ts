import sortedHackersService from "../service/sortedHackers-service.js";
import express, { Response, Request } from 'express';

const getSortedHackers = async (_req: Request, res: Response) => {
  try {
    const sortedHackers = await sortedHackersService.getSortedHackers();
    if (!sortedHackers || Object.values(sortedHackers).length === 0) {
      res.status(404).json({message: "Sorted hackers were null/empty..."})
    }
    res.json(sortedHackers)
    return sortedHackers;
  } catch (err) {
    res.status(400).json({message: "Failed to get sorted hackers.", err})
  }
  return;
};

const createSortedHacker = async (req: Request, res: Response) => {
  try {
    const hackerInformation = req.body;
    const createResponse = await sortedHackersService.createSortedHacker(hackerInformation)
    if (!createResponse || Object.values(createResponse).length === 0) {
      res.status(404).json({message: "Sorted hackers were null/empty..."})
    }
    res.json(createResponse)
    return createResponse;
  } catch (err) {
    res.status(400).json({message: "Failed to create sorted hackers.", err})
  }
  return;
};

const groupHackersByCabin = async (_req: Request, res: Response) => {
  try {
    const groupedHackers = await sortedHackersService.groupHackersByCabin()
    if (!groupedHackers || Object.values(groupedHackers).length === 0) {
      res.status(404).json({message: "Grouped hackers were null/empty..."})
    }
    res.json(groupedHackers)
    return groupedHackers
  } catch (err) {
    res.status(400).json({message: "Failed to group hackers by cabin.", err})
  }
  return;
}

export default {getSortedHackers, createSortedHacker, groupHackersByCabin };