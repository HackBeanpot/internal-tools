import { MongoClient } from "mongodb";
import "dotenv/config";

const uri : string  = process.env.MONGO_PROD_CONNECTION_STRING!;

const client = new MongoClient(uri);

async function connectToDatabase(collectionName : string) {
  const database = client.db(process.env.MONGO_SERVER_DBNAME);
  const collection = database.collection(collectionName);
  return collection;
}

export { client, connectToDatabase };