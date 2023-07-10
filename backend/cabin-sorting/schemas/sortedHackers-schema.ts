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
// export interface ApplicationResponses   {
//   firstName : string,
//   preferredName: string,
//   lastName: string,
//   pronouns: string,
//   gender: string,
//   unlistedGender: string,
//   races: string[],
//   unlistedRace: string,
//   school: string,
//   unlistedSchool: string,
//   education: string,
//   yearOfEducation: string,
//   majors: string,
//   minors: string,
//   resumeLink: string,
//   shirtSize: string,
//   accomodations: string,
//   hackathonsAttended: string,
//   csClassesTaken: string,
//   mobileAppDevelopmentFamiliarity: string,
//   webDevelopmentFamiliarity: string,
//   uiUxFamiliarity: string,
//   backendFamiliarity: string,
//   frontendFamiliarity: string,
//   dataScienceFamiliarity: string,
//   cybersecurityFamiliarity: string,
//   mobileAppDevelopmentInterestLevel: string,
//   webDevelopmentInterestLevel: string,
//   uiUxInterestLevel: string,
//   backendInterestLevel: string,
//   frontendInterestLevel: string,
//   dataScienceInterestLevel: string,
//   cybersecurityInterestLevel: string,
//   interestedWorkshops: string[]
//   unlistedWorkshops: string,
//   prevHackathonFeedback: string,
//   hackBeanGoals: string,
//   tedTalkTopic: string,
//   referrers: string[]
//   unListedReferrer: string,
//   premadeTeam: string,
//   interestedInTeamFormation: string,
//   questionsToAdd: string,
//   commentsQuestionsSuggestions: string,
//   howCanCoreTeamHelp: string,
//   lgbtq: string
// }

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


