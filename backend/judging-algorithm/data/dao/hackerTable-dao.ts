import { HackerOutput } from "../../types.js";
import hackerTeamModel from "../models/hackerTable-models.js";

export const getHackerTable = async () => 
  (await hackerTeamModel()).find();

export const getHackerTableById = async (hackerTableId: string) => 
  (await hackerTeamModel()).find({_id: hackerTableId});

  export const updateJudge = async (hackerTable: HackerOutput, hackerTableID: string) => 
  (await hackerTeamModel()).updateOne({_id: hackerTableID}, hackerTable); 

export const createHackerTable = async (hackerTable: HackerOutput) => 
  (await hackerTeamModel()).create(hackerTable); 

export const deleteHackerTable = async (hackerTableID: String) => 
  (await hackerTeamModel()).deleteOne({_id: hackerTableID});

export const deleteAllHackerTable = async () => 
  (await hackerTeamModel()).deleteMany({});