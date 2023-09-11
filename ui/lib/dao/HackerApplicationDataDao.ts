import {
  HackerApplicationDataType,
  HackerApplicationData as databaseConnection
} from '../../models/HackerApplicationData'
import { Model } from 'mongoose'

// Definse the Model connection to the database and connects to it
let HackerApplicationData: Model<HackerApplicationDataType>

databaseConnection().then((result) => {
  HackerApplicationData = result
})

export default { findByEmail, find, create, insertMany, pingServer }

async function findByEmail (email: string) {
  return await HackerApplicationData.findOne({ email })
}

async function find () {
  return await HackerApplicationData.find()
}

async function create (hackerApplication: HackerApplicationDataType) {
  return await HackerApplicationData.create(hackerApplication)
}

async function insertMany (hackerApplications: HackerApplicationDataType[]) {
  return await HackerApplicationData.insertMany(hackerApplications)
}

async function pingServer () {
  return await HackerApplicationData.db.db?.admin().ping()
}
