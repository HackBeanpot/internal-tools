import axios from "axios";
import https from 'https';
import { parseJudgeCSV, parseHackerTeamCSV, parseRoomsCSV, parseRotationTimeCSV } from  "./parser.js";
import 'dotenv/config';

export async function deleteAndPostData(resource: string, data: any[]) {
    try {
        await axios.delete(`${process.env.SERVER_URL}/${resource}`);

        for (const item of data) {
            await axios.post(`${process.env.SERVER_URL}/${resource}`, item, {
                httpsAgent: new https.Agent({ keepAlive: true })
            });
        }
        console.log(`Successfully updated ${resource}`);
    } catch (error) {
        console.error(`Failed to update ${resource} with error ${error}`);
    }
}

export async function updateJudgeData() {
    const newJudges = parseJudgeCSV('./data/csv_inputs/judges.csv');
    await deleteAndPostData('judges', newJudges);
}

export async function updatesTeamData() {
    const newTeams = parseHackerTeamCSV('./data/csv_inputs/hackers.csv');
    await deleteAndPostData('teams', newTeams);
}

export async function updateRoomsData() {
    const newRooms = parseRoomsCSV('./data/csv_inputs/rooms.csv');
    await deleteAndPostData('rooms', newRooms);
}

export async function updateRotationTimes() {
    const newRotationTimes = parseRotationTimeCSV('./data/csv_inputs/rotationTimes.csv');
    await deleteAndPostData('rotationTimes', newRotationTimes);
}