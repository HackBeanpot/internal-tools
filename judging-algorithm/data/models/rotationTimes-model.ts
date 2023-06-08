import monogoose from "mongoose";
import rotationTimesSchema from "../schemas/rotationTimes-schema";

const rotationTimesModel = monogoose.model("rotationTimes", rotationTimesSchema);

export default rotationTimesModel;