import connection from "../../connections.js";
import sortedHackerSchema from "../schemas/sortedHackers-schema.js";

const cabinConnection = connection.connectCabinDatabase();

const sortedHackersModel = async () => {
    return (await cabinConnection).model("Sorted Hackers", sortedHackerSchema);
}

export default sortedHackersModel;