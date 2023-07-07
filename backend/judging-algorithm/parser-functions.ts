import axios from "axios";
import { parseJudgeCSV, parseHackerTeamCSV, parseRoomsCSV, parseRotationTimeCSV } from  "./parser";

export async function updateJudgeData() {
    try {
        const deletedResponse = await axios.delete('http://localhost:4000/judges');
        console.log(deletedResponse.data);

        const newJudges = parseJudgeCSV('./data/csv_inputs/judges.csv');

        for (const judge of newJudges) {
            const postResponse = await axios.post('http://localhost:4000/judges', judge)
            console.log(postResponse.data);

        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatesTeamData() {
    try {
        const deletedResponse = await axios.delete('http://localhost:4000/teams');
        console.log(deletedResponse.data);

        const newTeams = parseHackerTeamCSV('./data/csv_inputs/hackers.csv');

        for (const team of newTeams) {
            const postResponse = await axios.post('http://localhost:4000/teams', team)
            console.log(postResponse.data);

        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateRoomsData() {
    try {
        const deletedResponse = await axios.delete('http://localhost:4000/rooms');
        console.log(deletedResponse.data);

        const newRooms = parseRoomsCSV('./data/csv_inputs/rooms.csv');

        for (const room of newRooms) {
            const postResponse = await axios.post('http://localhost:4000/rooms', room)
            console.log(postResponse.data);

        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateRotationTimes() {
    try {
        const deletedResponse = await axios.delete('http://localhost:4000/rotationTimes');
        console.log(deletedResponse.data);

        const newRotationTimes = parseRotationTimeCSV('./data/csv_inputs/rotationTimes.csv');

        for (const rotationTime of newRotationTimes) {
            const postResponse = await axios.post('http://localhost:4000/rotationTimes', rotationTime)
            console.log(postResponse.data);

        }
    } catch (error) {
        console.error(error);
    }
}