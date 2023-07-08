import { Hacker } from "../types";
import sortedHackersModel from "../models/sortedHackers-models.js";

export const getJudge = async () => 
  await sortedHackersModel.find();