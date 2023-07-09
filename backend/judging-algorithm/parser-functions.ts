import axios from "axios";
import https from 'https';
import { parseJudgeCSV, parseHackerTeamCSV, parseRoomsCSV, parseRotationTimeCSV } from  "./parser";

export async function updateJudgeData() {
    try {
        await axios.delete('http://localhost:4000/judges');

        const newJudges = parseJudgeCSV('./data/csv_inputs/judges.csv');

        for (const judge of newJudges) {
            await axios.post('http://localhost:4000/judges', judge, {httpsAgent: new https.Agent({ keepAlive: true })})
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatesTeamData() {
    try {
        await axios.delete('http://localhost:4000/teams');

        const newTeams = parseHackerTeamCSV('./data/csv_inputs/hackers.csv');

        for (const team of newTeams) {
            await axios.post('http://localhost:4000/teams', team)
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateRoomsData() {
    try {
        await axios.delete('http://localhost:4000/rooms');

        const newRooms = parseRoomsCSV('./data/csv_inputs/rooms.csv');

        for (const room of newRooms) {
            await axios.post('http://localhost:4000/rooms', room)
        }

    } catch (error) {
        console.error(error);
    }
}

export async function updateRotationTimes() {
    try {
        await axios.delete('http://localhost:4000/rotationTimes');

        const newRotationTimes = parseRotationTimeCSV('./data/csv_inputs/rotationTimes.csv');

        for (const rotationTime of newRotationTimes) {
            await axios.post('http://localhost:4000/rotationTimes', rotationTime)
        }
    } catch (error) {
        console.error(error);
    }
}