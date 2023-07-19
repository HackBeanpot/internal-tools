import connection from "../../../connections.js";
import hackerTableSchema from "../schemas/hackerTable-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const hackerTableModel = async () => {
    return (await judgingConnection).model("Judge", hackerTableSchema);
}

export default hackerTableModel;
