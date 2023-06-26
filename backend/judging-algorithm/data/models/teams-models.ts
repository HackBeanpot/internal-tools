import monogoose from "mongoose";
import teamsSchema from "../schemas/teams-schema.js";

const teamsModel = monogoose.model("Team", teamsSchema);

export default teamsModel;