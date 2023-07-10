import mongoose from "mongoose";

const mongoString: string = process.env.DATABASE_URL || ""

async function connectJudgingDatabase() {
    await mongoose.connect(mongoString, {
        dbName: 'Judging',
    });
    const database = mongoose.connection
    return database
}

async function connectCabinDatabase() {
    await mongoose.connect(mongoString, {
        dbName: 'HackbeanpotCluster',
    });
    const databaseCabins = mongoose.connection
    return databaseCabins
}

export default { connectJudgingDatabase, connectCabinDatabase }