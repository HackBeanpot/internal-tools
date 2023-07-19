import db from './db.js'
import controller from '../controllers/hackerTable-controller.js'
import { mockResponse, testCreateHackerTableRequest, testDeleteHackerTableRequest, testDeleteJudgeRequest } from './test-constants.js';
import hackerTableSchema from '../schemas/hackerTable-schema.js';
import mongoose from "mongoose";
import { HackerOutput } from '../../types.js';

beforeAll(
    async () => await db.connectDatabase()
)
afterAll(async () => {
    await db.closeDatabase();
})

jest.mock('../models/hackerTable-models.js', () => ({
    __esModule: true,
    default: function () {
        return mongoose.model("Hacker Table", hackerTableSchema)
    } 
}))

describe("HackerTable Tests", () => {
    it("Test create hacker table", async () => {
        const { id } = (await controller.createHackerTable(testCreateHackerTableRequest, mockResponse)) as HackerOutput;

        const createdHackerTableIdRequest = {
            params: {
                id: id
            }
        }

        const hackerTable  = await controller.getHackerTableById(createdHackerTableIdRequest, mockResponse);
        expect(hackerTable[0].project).toEqual("test project");
        expect(hackerTable[0].time).toEqual("3:00");
        expect(hackerTable[0].judges).toEqual(["Judge1", "Judge2"]);
        expect(hackerTable[0].room).toEqual("Room1");
    })

    it("Test create and get multiple hacker tables", async () => {
        await controller.createHackerTable(testCreateHackerTableRequest, mockResponse);
        await controller.createHackerTable(testCreateHackerTableRequest, mockResponse);

        const hackerTables = await controller.getHackerTable(undefined, mockResponse);
        expect(hackerTables.length).toEqual(3);
    })

    it("Test update hacker table", async () => {

        const { id } = (await controller.getHackerTable(undefined, mockResponse))[0]

        const updatedHackerTableRequest = {
            params: {
                id: id
            },
            body: {
                "project": "updated test project",
                "time": "3:00",
                "judges": ["Judge1", "Judge2"],
                "room": "updated Room1"
            }
        }

        await controller.updateHackerTable(updatedHackerTableRequest, mockResponse);

        const updatedHackerTableId = {
            params: {
                id: id
            }
        }

        const hackerTable  = await controller.getHackerTableById(updatedHackerTableId, mockResponse);
        expect(hackerTable[0].project).toEqual("updated test project");
        expect(hackerTable[0].time).toEqual("3:00");
        expect(hackerTable[0].judges).toEqual(["Judge1", "Judge2"]);
        expect(hackerTable[0].room).toEqual("updated Room1");
    })


    it("Test delete hacker table", async () => {
        const { id } = (await controller.createHackerTable(testDeleteHackerTableRequest, mockResponse)) as HackerOutput;

        const testDeleteHackerTableId = {
            params: {
                id: id
            }
        }

        await controller.deleteHackerTable(testDeleteHackerTableId, mockResponse);
        
        const deletedHackerTable = await controller.getHackerTableById(testDeleteHackerTableId, mockResponse);
        expect(deletedHackerTable).toEqual([]);
    })
})