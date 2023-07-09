import mongoose from "mongoose";

export const roomsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { 
    collection: "rooms",
    versionKey: false 
  }
);
export default roomsSchema;