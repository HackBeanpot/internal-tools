import mongoose from "mongoose";

export const judgesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    inPerson: { type: Boolean, required: true}
  },
  { 
    collection: "Judges",
    versionKey: false
  },
);
export default judgesSchema;