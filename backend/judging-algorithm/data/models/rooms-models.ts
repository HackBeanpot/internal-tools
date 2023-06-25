import monogoose from "mongoose";
import roomsSchema from "../schemas/rooms-schema";

const roomsModel = monogoose.model("Room", roomsSchema);

export default roomsModel;