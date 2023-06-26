import monogoose from "mongoose";
import rotationTimesSchema from "../schemas/rotationTimes-schema.js";

const rotationTimesModel = monogoose.model("RotationTime", rotationTimesSchema);

export default rotationTimesModel;