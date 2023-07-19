export type Hacker = {
  email: string;
  isAdmin?: boolean;
  applicationStatus: ApplicationStatusOptions;
  rsvpStatus: RsvpStatusOptions;
  decisionStatus: DecisionStatusOptions;
  rsvpSubmissionTime: Date;
  firstName: string;
  lastName: string;
  isAdult: boolean;
  adultSignature?: string;
  minorSignature?: string;
  guardianSignature?: string;
  proofOfVaccination: boolean;
};

export type FormattedHacker = {
  id: string,
  email: string,
  question0: string,
  question1: string,
  question2: string,
  question3: string,
  question4: string,
  question5: string,
  question6: string,
  question7: string,
  question8: string,
  question9: string,
  question10: string,
  question11: string
}

export enum ApplicationStatusOptions {
  'Submitted',
  'Incomplete'
}
export enum RsvpStatusOptions {
  'Confirmed',
  'Unconfirmed',
  'Not Attending'
}
export enum DecisionStatusOptions {
  'Admitted',
  'Waitlisted'
}
