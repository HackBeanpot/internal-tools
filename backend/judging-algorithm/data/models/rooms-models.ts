import connection from "../../../connections.js";
import roomsSchema from "../schemas/rooms-schema.js";

const judgingConnection = connection.connectJudgingDatabase()

const roomsModel = async () => {
    return (await judgingConnection).model("Room", roomsSchema);
}

export default roomsModel;