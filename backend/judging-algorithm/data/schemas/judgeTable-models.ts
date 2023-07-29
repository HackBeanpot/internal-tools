import mongoose from "mongoose";
import { JudgeOutputProjectsLiveSite } from "../../types.js";

const judgeOutputProjectsLiveSiteSchema = new mongoose.Schema({
  project: { type: String, required: true },
  time: { type: String, required: true },
}, {_id: false});

export const judgeTableSchema = new mongoose.Schema(
  {
    judge: { type: String, required: true },
    time: { type: String, required: true},
    projects: { type: judgeOutputProjectsLiveSiteSchema, required: true}
  },
  { 
    collection: "JudgeTable",
    versionKey: false
  },
);
export default judgeTableSchema;