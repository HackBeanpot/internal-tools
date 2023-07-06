import db from './db.js'
import controller from '../controllers/rooms-controller.js'
import { mockResponse, testCreateRoomRequest } from './test-constants.js';

beforeAll(async () => await db.connectDatabase())
afterAll(async () => {
    await db.closeDatabase();
})

// create room
it("Test create room", async () => {
    const { id } = await controller.createRoom(testCreateRoomRequest, mockResponse);

    const createdRoomIdRequest = {
        params: {
            id: id
        }
    }

    const room = await controller.getRoomById(createdRoomIdRequest, mockResponse);
    expect(room[0].name).toEqual("test room");
})

// create multiple rooms
it("Test create and get multiple rooms", async () => {
    await controller.createRoom(testCreateRoomRequest, mockResponse);
    await controller.createRoom(testCreateRoomRequest, mockResponse);

    const rooms = await controller.getRoom(undefined, mockResponse);
    expect(rooms.length).toEqual(3);
})

// update room
it("Test update room", async () => {
    const { id } = (await controller.getRoom(undefined, mockResponse))[0]

    const updatedRoomRequest = {
        params: {
            id: id
        },
        body: {
            name: "updated room",
        }
    }

    await controller.updateRoom(updatedRoomRequest, mockResponse);

    const updatedRoomIdRequest = {
        params: {
            id: id
        }
    }

    const updatedRoom  = await controller.getRoomById(updatedRoomIdRequest, mockResponse);
    expect(updatedRoom[0].name).toEqual("updated room");
})

// delete room
it("Test delete room", async () => {
    const { id } = await controller.createRoom(testCreateRoomRequest, mockResponse);

    const createdRoomIdRequest = {
        params: {
            id: id
        }
    }

    await controller.deleteRoom(createdRoomIdRequest, mockResponse);

    const deletedRoom = await controller.getRoomById(createdRoomIdRequest, mockResponse);
    expect(deletedRoom).toEqual([]);
})