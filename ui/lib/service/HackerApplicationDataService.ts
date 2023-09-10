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

export default {
  findHackerApplicationByEmail,
  findAllHackerApplications,
  saveHackerApplication,
  saveAllHackerApplications
}

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
