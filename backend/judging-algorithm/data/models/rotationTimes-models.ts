import connection from "../../../connections.js";
import rotationTimesSchema from "../schemas/rotationTimes-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const rotationTimesModel = async () => {
    return (await judgingConnection).model("RotationTime", rotationTimesSchema);
}

export default rotationTimesModel;