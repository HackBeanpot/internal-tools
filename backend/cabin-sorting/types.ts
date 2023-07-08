export type Hacker = {
    email: string,
    isAdmin?: boolean,
    applicationStatus: "Submitted" | "Not Submitted",
    rsvpStatus: "Confirmed" | "Not Confirmed",
    decisionStatus: "Admitted" | "Not Admitted",
    rsvpSubmissionTime: Date,
    firstName: string,
    lastName: string,
    isAdult: boolean,
    adultSignature? : string,
    minorSignature? : string,
    guardianSignature? : string,
    proofOfVaccination : boolean,
    

}
