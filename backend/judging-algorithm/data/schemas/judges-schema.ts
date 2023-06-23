import mongoose from "mongoose";

export const judgesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "judges" }
);
export default judgesSchema;