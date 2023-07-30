import db from './db.js'
import controller from '../controllers/judgeTable-controller.js'
import { mockResponse, testCreateJudgeTableProject, testCreateJudgeTableRequest } from './test-constants.js';
import judgeTableSchema from '../schemas/judgeTable-schema.js';
import mongoose from "mongoose";
import { JudgeOutput, JudgeOutputLiveSite } from '../../types.js';

beforeAll(
    async () => await db.connectDatabase()
)
afterAll(async () => {
    await db.closeDatabase();
})

jest.mock('../models/judgeTable-models.js', () => ({
    __esModule: true,
    default: function () {
        return mongoose.model("Judge Table", judgeTableSchema)
    } 
}))

describe("JudgeTable Tests", () => {
    it("Test create judge table", async () => {
        const { id } = (await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse)) as JudgeOutputLiveSite;

        const createdJudgeTableIdRequest = {
            params: {
                id: id
            }
        }

        const judgeTable  = await controller.getJudgeTableById(createdJudgeTableIdRequest, mockResponse);
        expect(judgeTable[0].judge).toEqual("judge1");
        expect(judgeTable[0].projects[0].room).toEqual(testCreateJudgeTableProject.room);
        expect(judgeTable[0].projects[0].time).toEqual(testCreateJudgeTableProject.time);
        expect(judgeTable[0].projects[0].judge).toEqual(testCreateJudgeTableProject.judge);
        expect(judgeTable[0].projects[0].project).toEqual(testCreateJudgeTableProject.project);
    })

    it("Test create and get multiple judge tables", async () => {
        await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse);
        await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse);

        const judgeTables = await controller.getJudgeTable(undefined, mockResponse);
        expect(judgeTables.length).toEqual(3);
    })

    it("Test update hacker table", async () => {

        const { id } = (await controller.getJudgeTable(undefined, mockResponse))[0]

        const updatedProject = {
            "room": "updated room1",
            "judge": "updated judge1",
            "time": "12:00",
            "project": "updated project1"
        }

        const updatedJudgeTableRequest = {
            params: {
                id: id
            },
            body: {
                "judge": "judge1",
                "room": "updated room1",
                "projects": [updatedProject],
            }
        }

        await controller.updateJudgeTable(updatedJudgeTableRequest, mockResponse);

        const updatedJudgeTableId = {
            params: {
                id: id
            }
        }

        const judgeTable  = await controller.getJudgeTableById(updatedJudgeTableId, mockResponse);
        expect(judgeTable[0].judge).toEqual("judge1");
        expect(judgeTable[0].room).toEqual("updated room1");
        expect(judgeTable[0].projects[0].room).toEqual(updatedProject.room);
        expect(judgeTable[0].projects[0].judge).toEqual(updatedProject.judge);
        expect(judgeTable[0].projects[0].time).toEqual(updatedProject.time);
        expect(judgeTable[0].projects[0].project).toEqual(updatedProject.project);
    })


    it("Test delete judge table", async () => {
        const { id } = (await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse)) as JudgeOutputLiveSite;

        const testDeleteJudgeTableId = {
            params: {
                id: id
            }
        }

        await controller.deleteJudgeTable(testDeleteJudgeTableId, mockResponse);
        
        const deletedJudgeTable = await controller.getJudgeTableById(testDeleteJudgeTableId, mockResponse);
        expect(deletedJudgeTable).toEqual([]);
    })
})