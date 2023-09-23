import { Model } from 'mongoose'
import { HackerApplicationDataType, HackerApplicationData as databaseConnection }
  from '../models/HackerApplicationData'

export const ConnectionStore = async () => {
  const HackerApplicationData : Model<HackerApplicationDataType> = await databaseConnection()
  return { HackerApplicationData }
}
