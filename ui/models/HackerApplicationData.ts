import { models, Schema } from 'mongoose'
import { mongooseConnect } from '../lib/mongoose'

export type HackerApplicationDataType = {
  email: string;
  applicationStatus: string;
  isAdmin: boolean;
  rsvpStatus: string;
  decisionStatus?: string;
  appSubmissionTime?: string;
  applicationResponses: any;
  postAcceptanceResponses?: {[key: string]: any};
};

const PostAcceptanceResponseSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    adult: { type: String, required: true },
    adultSignature: { type: String, required: true },
    minorSignature: { type: String, required: true },
    guardianSignature: { type: String, required: true },
    proofOfVaccination: { type: [Object], required: true }
  },
  {
    strict: false
  }
)

export const HackerApplicationDataSchema =
  new Schema<HackerApplicationDataType>(
    {
      email: { type: String, unique: true },
      applicationStatus: { type: String, required: true },
      isAdmin: { type: Boolean, required: true },
      rsvpStatus: { type: String, required: true },
      decisionStatus: { type: String, required: false },
      appSubmissionTime: { type: String, required: false },
      applicationResponses: {
        type: Object,
        required: [function (this: HackerApplicationDataType) {
          return this.applicationStatus === 'Submitted'
        }, 'applicationResponses must exist if the application status is Submitted']
      },
      postAcceptanceResponses: {
        type: PostAcceptanceResponseSchema,
        required: false
      }
    },
    {
      collection: 'applicant_data',
      versionKey: false
    }
  )

export const HackerApplicationData = async () => {
  const cabinConnection = await mongooseConnect(process.env.CABIN_CLUSTER_NAME)
  return (
    models?.HackerApplicationData ||
    cabinConnection.model('HackerApplicationData', HackerApplicationDataSchema)
  )
}
