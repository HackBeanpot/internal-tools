import mongoose from 'mongoose'

export async function mongooseConnect (databaseClusterName) {
  mongoose.connections.forEach(connection => console.log(connection.name))
  if (
    mongoose.connections.some(
      (connection) =>
        connection.readyState === 1 && connection.name === databaseClusterName
    )
  ) {
    return mongoose.connection
  } else {
    const uri = process.env.MONGODB_URI
    const connection = mongoose.createConnection(uri, {
      dbName: databaseClusterName
    })
    return connection
  }
}
