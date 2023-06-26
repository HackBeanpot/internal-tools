import mongoose from "mongoose";

export const roomsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { 
    collection: "Rooms",
    versionKey: false 
  }
);
export default roomsSchema;