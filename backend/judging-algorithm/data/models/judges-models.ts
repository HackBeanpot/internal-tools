import connection from "../../../connections.js";
import judgesSchema from "../schemas/judges-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const judgesModel = async () => {
    return (await judgingConnection).model("Judge", judgesSchema);
}

export default judgesModel;