import mongoose from 'mongoose'

export async function mongooseConnect (databaseClusterName) {
  mongoose.connections.forEach((connection) => {
    if (
      connection.readyState === 1 &&
      connection.name === databaseClusterName
    ) {
      return connection
    }
  })
  const uri = process.env.MONGODB_URI
  const connection = mongoose.createConnection(uri, {
    dbName: databaseClusterName
  })
  return connection
}
