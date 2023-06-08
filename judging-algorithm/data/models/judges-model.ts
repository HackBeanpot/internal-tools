import monogoose from "mongoose";
import judgesSchema from "../schemas/judges-schema";

const judgesModel = monogoose.model("judges", judgesSchema);

export default judgesModel;