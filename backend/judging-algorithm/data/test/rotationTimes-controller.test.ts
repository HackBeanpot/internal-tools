import db from './db.js'
import controller from '../controllers/rotationTimes-controller.js'
import { mockResponse, testCreateRotationTimeRequest } from './test-constants.js';
import rotationTimesSchema from '../schemas/rotationTimes-schema.js';
import mongoose from 'mongoose';

beforeAll(async () => await db.connectDatabase())
afterAll(async () => {
    await db.closeDatabase();
})

jest.mock('../models/rotationTimes-models.js', () => ({
    __esModule: true,
    default: function () {
        return mongoose.model("RotationTime", rotationTimesSchema)
    } 
}))

describe("Rotation Time Tests", () => {
    it("Test create rotation time", async () => {
        const { id } = await controller.createRotationTime(testCreateRotationTimeRequest, mockResponse);

        const createdRotationTimeIdRequest = {
            params: {
                id: id
            }
        }

        const rotationTime = await controller.getRotationTimeById(createdRotationTimeIdRequest, mockResponse);
        expect(rotationTime[0].startTime).toEqual("1:00");
    })

    // create multiple rotation times
    it("Test create rotation times", async () => {
        await controller.createRotationTime(testCreateRotationTimeRequest, mockResponse);
        await controller.createRotationTime(testCreateRotationTimeRequest, mockResponse);

        const rotationTimes = await controller.getRotationTime(undefined, mockResponse);
        expect(rotationTimes.length).toEqual(3);
    })

    // update rotation times
    it("Test update rotation times", async () => {
        const { id } = (await controller.getRotationTime(undefined, mockResponse))[0]

        const updatedRotationTimeRequest = {
            params: {
                id: id
            },
            body: {
                startTime: "7:00",
            }
        }

        await controller.updateRotationTime(updatedRotationTimeRequest, mockResponse);

        const updatedRotationTimeIdRequest = {
            params: {
                id: id
            }
        }

        const updatedRotationTime  = await controller.getRotationTimeById(updatedRotationTimeIdRequest, mockResponse);
        expect(updatedRotationTime[0].startTime).toEqual("7:00");
    })

    // delete rotation time
    it("Test delete rotation time", async () => {
        const { id } = await controller.createRotationTime(testCreateRotationTimeRequest, mockResponse);

        const createdRotationTimeIdRequest = {
            params: {
                id: id
            }
        }

        await controller.deleteRotationTime(createdRotationTimeIdRequest, mockResponse);

        const deletedRotationTime = await controller.getRotationTimeById(createdRotationTimeIdRequest, mockResponse);
        expect(deletedRotationTime).toEqual([]);
    })
})