import monogoose from "mongoose";
import teamsSchema from "../schemas/teams-schema";

const teamsModel = monogoose.model("teams", teamsSchema);

export default teamsModel;