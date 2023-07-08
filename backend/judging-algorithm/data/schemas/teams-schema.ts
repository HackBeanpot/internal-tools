import mongoose from "mongoose";

export const teamsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    liveDemo: { type: String, required: true },
  },
  { 
    collection: "teams",
    versionKey: false
  }
);
export default teamsSchema;