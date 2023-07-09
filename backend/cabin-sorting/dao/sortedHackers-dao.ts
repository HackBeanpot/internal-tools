import { Hacker } from "../types.js";
import sortedHackersModel from "../models/sortedHackers-models.js";

export const getSortedHackers = async () => 
  await sortedHackersModel.find();

export const createdSortedHacker = async (hacker : Hacker) => 
  await sortedHackersModel.create(hacker);