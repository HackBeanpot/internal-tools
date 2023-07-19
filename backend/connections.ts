import mongoose from "mongoose";

const mongoString: string = process.env.DATABASE_URL || ""

async function connectJudgingDatabase() {
    const database = mongoose.createConnection(mongoString, {
        dbName: 'Judging',
    });
    return database
}

async function connectCabinDatabase() {
    const databaseCabins = mongoose.createConnection(mongoString, {
        dbName: 'HackbeanpotCluster',
    });
    return databaseCabins
}

export default { connectCabinDatabase, connectJudgingDatabase }