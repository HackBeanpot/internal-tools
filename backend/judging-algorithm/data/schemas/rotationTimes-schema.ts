import mongoose from "mongoose";

export const rotationTimesSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true },
  },
  { collection: "rotationTimes" }
);
export default rotationTimesSchema;