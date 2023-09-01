import mongoose from 'mongoose'

export async function mongooseConnect (databaseClusterName) {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise()
  } else {
    const uri = process.env.MONGODB_URI
    const connection = mongoose.createConnection(uri, {
      dbName: databaseClusterName
    })
    return connection
  }
}
