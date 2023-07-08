import monogoose from "mongoose";
import sortedHackerSchema from "../schemas/sortedHackers-schema.js";

const sortedHackersModel = monogoose.model("Sorted Hackers", sortedHackerSchema);

export default sortedHackersModel;