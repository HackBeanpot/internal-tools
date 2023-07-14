import monogoose from "mongoose";
import hacketTableSchema from "../schemas/hackerTable-schema.js";

const hackerTableModel = monogoose.model("HackerTable", hacketTableSchema);

export default hackerTableModel;