import mongoose from "mongoose";

export const judgesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    inperson: { type: Boolean, required: true}
  },
  { collection: "judges" }
);
export default judgesSchema;