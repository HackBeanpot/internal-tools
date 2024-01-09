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