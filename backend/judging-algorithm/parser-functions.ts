import axios from "axios";
import https from 'https';
import { parseJudgeCSV, parseHackerTeamCSV, parseRoomsCSV, parseRotationTimeCSV } from  "./parser";
import 'dotenv/config';

export async function updateJudgeData() {
    try {
        await axios.delete(`${process.env.SERVER_URL}/judges`);

        const newJudges = parseJudgeCSV('./data/csv_inputs/judges.csv');

        for (const judge of newJudges) {
            await axios.post(`${process.env.SERVER_URL}/judges`, judge, {httpsAgent: new https.Agent({ keepAlive: true })})
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatesTeamData() {
    try {
        await axios.delete(`${process.env.SERVER_URL}/teams`);

        const newTeams = parseHackerTeamCSV('./data/csv_inputs/hackers.csv');

        for (const team of newTeams) {
            await axios.post(`${process.env.SERVER_URL}/teams`, team)
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateRoomsData() {
    try {
        await axios.delete(`${process.env.SERVER_URL}/rooms`);

        const newRooms = parseRoomsCSV('./data/csv_inputs/rooms.csv');

        for (const room of newRooms) {
            await axios.post(`${process.env.SERVER_URL}/rooms`, room)
        }

    } catch (error) {
        console.error(error);
    }
}

export async function updateRotationTimes() {
    try {
        await axios.delete(`${process.env.SERVER_URL}/rotationTimes`);

        const newRotationTimes = parseRotationTimeCSV('./data/csv_inputs/rotationTimes.csv');

        for (const rotationTime of newRotationTimes) {
            await axios.post(`${process.env.SERVER_URL}/rotationTimes`, rotationTime)
        }
    } catch (error) {
        console.error(error);
    }
}