import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

const db = new MongoMemoryServer();

const connectDatabase = async () => {
    await db.start();
    const uri = db.getUri();
    await mongoose.connect(uri);
}

const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await db.stop();
}

const clearDatabase =async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}

export default { connectDatabase, closeDatabase, clearDatabase}