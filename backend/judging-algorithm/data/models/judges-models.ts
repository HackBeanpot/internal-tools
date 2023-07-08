import monogoose from "mongoose";
import judgesSchema from "../schemas/judges-schema.js";

const judgesModel = monogoose.model("Judge", judgesSchema);

export default judgesModel;