import { HackerApplicationDataType } from '../../models/HackerApplicationData'
import HackerApplicationDataDao from '../dao/HackerApplicationDataDao'

const findHackerApplicationByEmail =
async (email: string): Promise<HackerApplicationDataType | null> => {
  return await HackerApplicationDataDao.findByEmail(email)
}

const findAllHackerApplications =
async (): Promise<HackerApplicationDataType[]> => {
  return await HackerApplicationDataDao.find()
}

const saveHackerApplication =
  async (hackerApplication: HackerApplicationDataType): Promise<HackerApplicationDataType> => {
    return await HackerApplicationDataDao.create(hackerApplication)
  }

const saveAllHackerApplications =
  async (hackerApplications: HackerApplicationDataType[]): Promise<HackerApplicationDataType[]> => {
    return await HackerApplicationDataDao.insertMany(hackerApplications)
  }

export default {
  findHackerApplicationByEmail,
  findAllHackerApplications,
  saveHackerApplication,
  saveAllHackerApplications
}
