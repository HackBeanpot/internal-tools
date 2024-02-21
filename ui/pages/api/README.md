# API Routes Documentation

This application uses Next.js page routing to define API endpoints under the `pages/api` directory. Each `.ts` file in this directory maps to an endpoint.

## Endpoints

### `GET /api/cabinSorting/hacker`

- Gets a list of all hacker information
- Success: Status code 200
- Failure: Status code 500

### `POST /api/cabinSorting/hacker`

- Creates a new hacker and saves it
- Body: Can either be a singular hacker, or an array of hackers
Note: the hacker can be either just a normal hacker object, or a list of hacker objects to mass insert data
POST request should follow this schema pattern:
{
    “email”: string (unique),
    “applicationStatus”: string ,
    “isAdmin”: boolean,
    “rsvpStatus”: string
    “decisionStatus”: string ,
    “appSubmissionTime”: “2022-11-14T23:29:08.701+00:00”,
    “applicationResponses”: {
      “firstName”: string ,
      “preferredName”: string | null,
      “lastName”: string ,
      “pronouns”: string ,
      “gender”: string ,
      “unlistedGender”: string | null,
      “races”: string[],
      “unlistedRace”: string | string ,
      “school”: string ,
      “unlistedSchool”: string | null,
      “education”:string ,
      “yearOfEducation”: string ,
      “majors”: string ,
      “minors”: string | null,
      “resumeLink”: string ,
      “shirtSize”: string
      “accomodations”: string | null,
      “hackathonsAttended”: string ,
      “csClassesTaken”: string ,
      “mobileAppDevelopmentFamiliarity”: string ,
      “webDevelopmentFamiliarity”: string
      “uiUxFamiliarity”: string ,
      “backendFamiliarity”: string ,
      “frontendFamiliarity”: string ,
      “dataScienceFamiliarity”: string ,
      “cybersecurityFamiliarity”: string ,
      “mobileAppDevelopmentInterestLevel”: string ,
      “webDevelopmentInterestLevel”: string ”,
      “uiUxInterestLevel”: string ,
      “backendInterestLevel”: string ,
      “frontendInterestLevel”: string ,
      “dataScienceInterestLevel”: string ,
      “cybersecurityInterestLevel”: string ,
      “interestedWorkshops”: string[],
      “unlistedWorkshops”: string | null,
      “prevHackathonFeedback”: string
      “hackBeanGoals”: string ,
      “tedTalkTopic”: string ,
      “referrers”: string[],
      “unListedReferrer”: string | null,
      “premadeTeam”: string ,
      “interestedInTeamFormation”: string ,
      “questionsToAdd”: string | null,
      “commentsQuestionsSuggestions”: string | null,
      “howCanCoreTeamHelp”: string | null,
      “lgbtq”: string
    },
    “postAcceptanceResponses”: {
      “firstName”: string,
      “lastName”: string,
      “adult”: string,
      “adultSignature”: string,
      “minorSignature”: string,
      “guardianSignature”: string,
      “proofOfVaccination”: string[],
      “_id”: “65791683834ef3443f477b0d”,
      “swag”: string,
      “hangingWithFriends”: string,
      “zombieApocalypse”: string,
      “takeOverNation”: string,
      “aspirations”: string,
      “study”: string,
      “stuckInElevator”: string,
      “socialMedia”: string,
      “duringClass”: string,
      “rsvpSubmissionTime”: “2023-01-25T04:19:01.341+00:00"
    }
  }

- Success: Status code 200
- Failure: Status code 500

### `PUT /api/cabinSorting/hacker`

- Pings MongoDB server to check if it is running
- Success: Status code 200
- Failure: Status code 500

### `GET /api/cabinSorting/hacker/[email]`

- Gets a single hacker by email
- `email`: The email of the user
- Success: Status code 200
- Failure: Status code 500

### `GET /api/cabinSorting/sortedHackers`

- Sorts all of the hackers in the database and returns an object of all the hackers separated into their desired cabins, and a list of all hackers with their email, answers and, assigned cabins up to 2
- Success: Status Code 200
- Failure: Status Code 500