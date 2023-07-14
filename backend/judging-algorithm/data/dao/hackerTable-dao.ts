import {HackerOutput} from "../../types.js";
import hackerTeamModel from "../models/hackerTable-models.js";

export const getHackerTable = async () => 
  await hackerTeamModel.find();

export const getHackerTableById = async (hackerTableId: string) => 
  await hackerTeamModel.find({_id: hackerTableId});

export const getHackerTableByName =async (hackerTableName: string) =>
  await hackerTeamModel.findOne({name: hackerTableName});  

export const createHackerTable = async (hackerTable: HackerOutput) => 
  await hackerTeamModel.create(hackerTable); 

export const deleteAllHackerTable = async () => 
await hackerTeamModel.deleteMany({});