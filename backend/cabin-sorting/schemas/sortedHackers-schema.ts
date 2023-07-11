import mongoose from "mongoose";

export enum ApplicationStatusOptions {
  "Submitted",
  "Incomplete",
}
export enum RsvpStatusOptions {
  "Confirmed",
  "Unconfirmed",
  "Not Attending",
}
export enum DecisionStatusOptions {
  "Admitted",
  "Waitlisted",
}

export const sortedHackersSchema = new mongoose.Schema(
  {
    email: {type: String, required: true},
    applicationStatus: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    rsvpStatus: {type: String, required: true},
    decisionStatus: {type: String, required: false},
    appSubmissionTime: {type: String, required: false},
    applicationResponses: {type: Object, required: false}
  },
  { 
    collection: "applicant_data_test",
    versionKey: false
  },
);
export default sortedHackersSchema;


