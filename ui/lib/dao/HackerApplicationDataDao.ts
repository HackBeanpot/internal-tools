import {
  HackerApplicationDataType
} from '../../models/HackerApplicationData'
import { ConnectionStore } from '../connections'

export default { findByEmail, find, create, insertMany, pingServer }

async function findByEmail (email: string) {
  const HackerApplicationData = (await ConnectionStore()).HackerApplicationData
  return await HackerApplicationData.findOne({ email })
}

async function find () {
  const HackerApplicationData = (await ConnectionStore()).HackerApplicationData
  return await HackerApplicationData.find()
}

async function create (hackerApplication: HackerApplicationDataType) {
  const HackerApplicationData = (await ConnectionStore()).HackerApplicationData
  return await HackerApplicationData.create(hackerApplication)
}

async function insertMany (hackerApplications: HackerApplicationDataType[]) {
  const HackerApplicationData = (await ConnectionStore()).HackerApplicationData
  return await HackerApplicationData.insertMany(hackerApplications)
}

async function pingServer () {
  const HackerApplicationData = (await ConnectionStore()).HackerApplicationData
  return await HackerApplicationData.db.db?.admin().ping()
}
