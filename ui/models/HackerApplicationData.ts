import { Connection, models, Schema } from 'mongoose'

export interface HackerApplicationDataType {
  email: string
  applicationStatus: string
  isAdmin: boolean
  rsvpStatus: string
  decisionStatus?: string,
  appSubmissionTime?: string,
  applicationResponses?: any,
  postAcceptanceResponses?: any
}

const PostAcceptanceResponseSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  adult: { type: String, required: true },
  adultSignature: { type: String, required: true },
  minorSignature: { type: String, required: true },
  guardianSignature: { type: String, required: true },
  proofOfVaccination: { type: [Object], required: true }
}, {
  strict: false
})

export const HackerApplicationDataSchema = new Schema<HackerApplicationDataType>(
  {
    email: { type: String, unique: true },
    applicationStatus: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    rsvpStatus: { type: String, required: true },
    decisionStatus: { type: String, required: false },
    appSubmissionTime: { type: String, required: false },
    applicationResponses: { type: Object, required: false },
    postAcceptanceResponses: { type: PostAcceptanceResponseSchema, required: false }
  },
  {
    collection: 'hacker_applications',
    versionKey: false
  }
)

export const createModelWithConnection = (connection : Connection) => {
  return models?.HackerApplicationData ||
   connection.model('HackerApplicationData', HackerApplicationDataSchema)
}
