import mongoose from "mongoose";
import sortedHackerSchema from "../schemas/sortedHackers-schema.js";

const sortedHackersModel = mongoose.model("Sorted Hacker", sortedHackerSchema);

export default sortedHackersModel;