import connection from "../../../connections.js";
import judgeTableSchema from "../schemas/judgeTable-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const judgeTableModel = async () => {
    return (await judgingConnection).model("Judge", judgeTableSchema);
}

export default judgeTableModel;
