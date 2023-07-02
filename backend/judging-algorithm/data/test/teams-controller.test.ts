import db from './db.js'
import controller from '../controllers/teams-controller.js'
import { mockResponse, testCreateTeamRequest } from './test-constants.js';

beforeAll(async () => await db.connectDatabase())
afterAll(async () => {
    await db.clearDatabase();
    await db.closeDatabase();
})

// create team
it("Test create team", async () => {
    const { id } = await controller.createTeam(testCreateTeamRequest, mockResponse);

    const createdTeamIdRequest = {
        params: {
            id: id
        }
    }

    const team  = await controller.getTeamById(createdTeamIdRequest, mockResponse);
    expect(team[0].name).toEqual("test team");
})

// create multiple teams
it("Test create and get multiple teams", async () => {
    await controller.createTeam(testCreateTeamRequest, mockResponse);
    await controller.createTeam(testCreateTeamRequest, mockResponse);

    const teams = await controller.getTeam(undefined, mockResponse);
    expect(teams.length).toEqual(3);
})

// update team
it("Test update team", async () => {
    const { id } = (await controller.getTeam(undefined, mockResponse))[0];

    const updatedTeamRequest = {
        params: {
            id: id
        },
        body: {
            name: "updated team",
            inPerson: true
        }
    }

    await controller.updateTeam(updatedTeamRequest, mockResponse);

    const updatedTeamIdRequest = {
        params: {
            id: id
        }
    }

    const updatedTeam  = await controller.getTeamById(updatedTeamIdRequest, mockResponse);
    expect(updatedTeam[0].name).toEqual("updated team");
})

// delete team
it("Test delete team", async () => {
    const { id } = await controller.createTeam(testCreateTeamRequest, mockResponse);

    const testDeletedTeamIdRequest = {
        params: {
            id: id
        }
    }

    await controller.deleteTeam(testDeletedTeamIdRequest, mockResponse);

    const deletedTeam = await controller.getTeamById(testDeletedTeamIdRequest, mockResponse);
    expect(deletedTeam).toEqual([]);
})