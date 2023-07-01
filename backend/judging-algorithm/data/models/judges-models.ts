import monogoose from "mongoose";
import judgesSchema from "../schemas/judges-schema";

const judgesModel = monogoose.model("Judge", judgesSchema);

export default judgesModel;