import {
  HackerApplicationDataSchema,
  HackerApplicationDataType
} from '../../models/HackerApplicationData'
import HackerApplicationDataDao from '../dao/HackerApplicationDataDao'

const findHackerApplicationByEmail = async (
  email: string
): Promise<HackerApplicationDataType | null> => {
  return await HackerApplicationDataDao.findByEmail(email)
}

const findAllHackerApplications = async (): Promise<
  HackerApplicationDataType[]
> => {
  return await HackerApplicationDataDao.find()
}

const saveHackerApplication = async (
  hackerApplication: HackerApplicationDataType
): Promise<HackerApplicationDataType> => {
  validatePostRequestBody(hackerApplication)
  return await HackerApplicationDataDao.create(hackerApplication)
}

const saveAllHackerApplications = async (
  hackerApplications: HackerApplicationDataType[]
): Promise<HackerApplicationDataType[]> => {
  validatePostRequestBody(hackerApplications)
  return await HackerApplicationDataDao.insertMany(hackerApplications)
}

const pingServer = async (): Promise<void> => {
  for (let i = 1; i <= 3; i++) {
    console.log('Attempting ping to Mongo Server for Hacker Application Data')
    try {
      await HackerApplicationDataDao.pingServer()
      console.log(`Attempt ${i} succeeded`)
      return
    } catch (err) {
      if (i <= 3) {
        console.log(`Attempt ${i} failed`)
        continue
      } else {
        throw err
      }
    }
  }
}

export default {
  findHackerApplicationByEmail,
  findAllHackerApplications,
  saveHackerApplication,
  saveAllHackerApplications,
  pingServer
}

// Helper Functions

function validatePostRequestBody (
  requestBody: HackerApplicationDataType | HackerApplicationDataType[]
): void {
  if (Array.isArray(requestBody)) {
    requestBody.forEach((requestBodyElement) =>
      validateBody(requestBodyElement)
    )
  } else {
    validateBody(requestBody)
  }

  function validateBody (body: any) {
    if (
      !isValidBody<HackerApplicationDataType>(
        body,
        Object.keys(HackerApplicationDataSchema.paths).map(
          (key) => key as keyof HackerApplicationDataType
        )
      )
    ) {
      throw Error('Invalid Request Body')
    }
  }
}

function isValidBody<T extends Record<string, unknown>> (
  body: any,
  fields: (keyof T)[]
): body is T {
  return Object.keys(body).every((key) => fields.includes(key))
}
