import { JudgeOutput } from "../../types.js";
import judgeTableModel from "../models/judgeTable-models.js";

export const getJudgeTable = async () => 
  (await judgeTableModel()).find();

export const getJudgeTableById = async (judgeTableId: string) => 
  (await judgeTableModel()).find({_id: judgeTableId});

  export const updateJudgeTable = async (judgeTable: JudgeOutput, judgeTableId: string) => 
  (await judgeTableModel()).updateOne({_id: judgeTableId}, judgeTable); 

export const createJudgeTable = async (judgeTable: JudgeOutput) => 
  (await judgeTableModel()).create(judgeTable); 

export const deleteJudgeTable = async (judgeTableId: String) => 
  (await judgeTableModel()).deleteOne({_id: judgeTableId});

export const deleteAllJudgeTable = async () => 
  (await judgeTableModel()).deleteMany({});