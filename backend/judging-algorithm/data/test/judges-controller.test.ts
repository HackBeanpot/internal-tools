import db from './db.js'
import controller from '../controllers/judges-controller.js'
import { mockResponse, testCreateJudgeRequest, testDeleteJudgeRequest } from './test-constants.js';
import judgesSchema from '../schemas/judges-schema.js';
import mongoose from "mongoose";

beforeAll(
    async () => await db.connectDatabase()
)
afterAll(async () => {
    await db.closeDatabase();
})

jest.mock('../models/judges-models.js', () => ({
    __esModule: true,
    default: function () {
        return mongoose.model("Judge", judgesSchema)
    } 
}))

describe("Judge Tests", () => {
    it("Test create judge", async () => {
        const { id } = await controller.createJudge(testCreateJudgeRequest, mockResponse);

        const createdJudgeIdRequest = {
            params: {
                id: id
            }
        }

        const judge  = await controller.getJudgeById(createdJudgeIdRequest, mockResponse);
        expect(judge[0].name).toEqual("test judge");
    })

    // create multiple judge
    it("Test create judge", async () => {
        await controller.createJudge(testCreateJudgeRequest, mockResponse);
        await controller.createJudge(testCreateJudgeRequest, mockResponse);

        const judges = await controller.getJudge(undefined, mockResponse);
        expect(judges.length).toEqual(3);
    })

    // update judge
    it("Test update judge", async () => {

        const { id } = (await controller.getJudge(undefined, mockResponse))[0]

        const updatedJudgeRequest = {
            params: {
                id: id
            },
            body: {
                name: "updated judge",
                inPerson: true
            }
        }

        await controller.updateJudge(updatedJudgeRequest, mockResponse);

        const updatedJudgeId = {
            params: {
                id: id
            }
        }

        const updatedJudge  = await controller.getJudgeById(updatedJudgeId, mockResponse);
        expect(updatedJudge[0].name).toEqual("updated judge");
    })

    // delete judge
    it("Test delete judge", async () => {
        const { id } = await controller.createJudge(testDeleteJudgeRequest, mockResponse);

        const testDeleteJudgeId = {
            params: {
                id: id
            }
        }

        await controller.deleteJudge(testDeleteJudgeId, mockResponse);
        
        const deletedJudge = await controller.getJudgeById(testDeleteJudgeId, mockResponse);
        expect(deletedJudge).toEqual([]);
    })
})