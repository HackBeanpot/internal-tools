import connection from "../../../connections.js";
import teamsSchema from "../schemas/teams-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const teamsModel = async () => {
    return (await judgingConnection).model("Team", teamsSchema);
}

export default teamsModel;