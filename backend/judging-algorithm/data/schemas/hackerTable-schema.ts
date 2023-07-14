import mongoose from "mongoose";

export const hackerTableSchema = new mongoose.Schema(
  {
    project: { type: String, required: true },
    time: { type: String, required: true},
    judges: { type: [String], required: true},
    room: { type: String, required: true}

  },
  { 
    collection: "HackerTable",
    versionKey: false
  },
);
export default hackerTableSchema;