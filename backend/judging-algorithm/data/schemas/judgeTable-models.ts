import mongoose from "mongoose";

export const judgeTableSchema = new mongoose.Schema(
  {
    judge: { type: String, required: true },
    time: { type: String, required: true},
    project: { type: String, required: true},
    room: { type: String, required: true}
  },
  { 
    collection: "JudgeTable",
    versionKey: false
  },
);
export default judgeTableSchema;