import monogoose from "mongoose";
import roomsSchema from "../schemas/rooms-schema";

const roomsModel = monogoose.model("rooms", roomsSchema);

export default roomsModel;