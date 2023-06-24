import monogoose from "mongoose";
import teamsSchema from "../schemas/teams-schema";

const teamsModel = monogoose.model("Team", teamsSchema);

export default teamsModel;