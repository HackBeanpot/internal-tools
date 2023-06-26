import monogoose from "mongoose";
import roomsSchema from "../schemas/rooms-schema.js";

const roomsModel = monogoose.model("Room", roomsSchema);

export default roomsModel;