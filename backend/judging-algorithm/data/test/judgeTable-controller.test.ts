import db from './db.js'
import controller from '../controllers/judgeTable-controller.js'
import { mockResponse, testCreateJudgeTableRequest, testDeleteJudgeTableRequest } from './test-constants.js';
import judgeTableSchema from '../schemas/judgeTable-models.js';
import mongoose from "mongoose";
import { JudgeOutput } from '../../types.js';

beforeAll(
    async () => await db.connectDatabase()
)
afterAll(async () => {
    await db.closeDatabase();
})

jest.mock('../models/judgeTable-models.js', () => ({
    __esModule: true,
    default: function () {
        return mongoose.model("Hacker Table", judgeTableSchema)
    } 
}))

describe("HackerTable Tests", () => {
    it("Test create hacker table", async () => {
        const { id } = (await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse)) as JudgeOutput;

        const createdJudgeTableIdRequest = {
            params: {
                id: id
            }
        }

        const judgeTable  = await controller.getJudgeTableById(createdJudgeTableIdRequest, mockResponse);
        expect(judgeTable[0].judge).toEqual("judge1");
        expect(judgeTable[0].time).toEqual("3:00");
        expect(judgeTable[0].project).toEqual("test create judge table");
        expect(judgeTable[0].room).toEqual("Room1");
    })

    it("Test create and get multiple judge tables", async () => {
        await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse);
        await controller.createJudgeTable(testCreateJudgeTableRequest, mockResponse);

        const judgeTables = await controller.getJudgeTable(undefined, mockResponse);
        expect(judgeTables.length).toEqual(3);
    })

    it("Test update hacker table", async () => {

        const { id } = (await controller.getJudgeTable(undefined, mockResponse))[0]

        const updatedJudgeTableRequest = {
            params: {
                id: id
            },
            body: {
                "judge": "judge1",
                "time": "3:00",
                "project": "updated create judge table",
                "room": "updated room1"
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
        expect(judgeTable[0].time).toEqual("3:00");
        expect(judgeTable[0].project).toEqual("updated create judge table");
        expect(judgeTable[0].room).toEqual("updated room1");
    })


    it("Test delete judge table", async () => {
        const { id } = (await controller.createJudgeTable(testDeleteJudgeTableRequest, mockResponse)) as JudgeOutput;

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