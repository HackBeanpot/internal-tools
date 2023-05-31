import { MongoClient } from 'mongodb'

async function connectDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);

  return client;
}

export default async function handler () {
  
}
