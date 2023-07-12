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
