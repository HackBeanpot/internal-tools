Judging Algorithm Usage:

1. NAVIGATE TO THIS FOLDER

In your terminal, `cd` in to `/judging-algorithm` within this `internal-tools` repository.

Run `yarn install` so that you can run the script.

2. UPLOAD YOUR CSV FILE FOR HACKERS

a. Download Devpost hackers CSV
b. Delete all columns except for `Project Title` and `Will you Demo` questions
c. Rename these columns to `name` and `liveDemo`
c. Download and save as `hackers.csv` within `/judging-algorithm/data/csv_inputs` folder

3. KICK OFF THE SORTING SCRIPT

use `node 16`

Run our script that splits our judges and hackers in to the inputted rooms
by executing the following command:

`npx ts-node --experimental-specifier-resolution=node index.ts`

If you get this `Error: Cannot find module 'typescript'` then fix it by executing the following command:
`npm i typescript`

This outputs our results in to JSON files `hackerResults.json` and `judgeResults.json` which the site will read and upload!

--

NOTE: With the addition of the judging-algorithm backend implementation, you must start up the backend server before running the above script. This can be done by running `ts-node .\app.ts` in the backend folder. Using `yarn dev` will cause `ECONNRESET` error from axios.

IMPLEMENTATION STRATEGY:

1. Parse CSV files using `parser.ts`
2. Sort judges in to rooms in `formSchedule.ts` in order provided in CSV
3. Sort hackers in to rooms in `formSchedule.ts` in order provided in CSV
4. Produce judge and hacker output tables to render in `formJsonOutput.ts`
5. Convert tabular data in to JSON that the front-end can consume in `live-site` folder

FUTURE EXTENSIONS:

1. Accomodate remote judges by adding a bias that sorts Zoom judges in to same room
2. Room capacities filter based on (hackerCount + judgeCount) not just judgeCount
   (just filtering by judgeCount does not really ensure we automate capacity constraint)
