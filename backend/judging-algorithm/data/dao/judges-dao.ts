import { Judge } from "../../types";
import judgesModel from "../models/judges-models";

export const getJudge = async () => 
  await judgesModel.find();

export const getJudgeById = async (judgeID: string) => 
  await judgesModel.find({_id: judgeID});

export const getJudgeByName =async (judgeName: string) =>
  await judgesModel.findOne({name: judgeName});  

export const createJudge = async (judge: Judge) => 
  await judgesModel.create(judge); 

export const updateJudge = async (judge: Judge, judgeID: string) => 
  await judgesModel.updateOne({_id: judgeID}, judge); 

export const deleteJudge = async (judgeID: string) => 
  await judgesModel.deleteOne({_id: judgeID}); 