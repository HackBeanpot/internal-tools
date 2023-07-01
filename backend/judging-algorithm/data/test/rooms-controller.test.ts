import db from './db.js'
import controller from '../controllers/rooms-controller.js'
import { getRoom } from '../dao/rooms-dao.js';

beforeAll(async () => await db.connectDatabase())
afterAll(async () => {
    await db.clearDatabase();
    await db.closeDatabase();
})

// create room
it("Test create room", async () => {
    const req = {
        body: {
            name: "test room"
        }
    }
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    console.log("req body name: "+ req.body.name);
    console.log("res: " + res);
    const { id } = await controller.createRoom(req, res);

    const req2 = {
        params: {
            id: id
        }
    }
    let res2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    console.log("req params: "+ req2.params.id);

    const room  = await controller.getRoomById(req2, res2);
    console.log(room)
    expect(room[0].name).toEqual("test room");
})

// update room
it("Test update room", async () => {
    const req = {
        body: {
            name: "test room",
        }
    }
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    let res2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const { id } = await controller.createRoom(req, res);
    const allRooms = await getRoom();
    console.log("allRooms", allRooms)
    const req2 = {
        params: {
            id: id
        },
        body: {
            name: "updated room",
        }
    }

    await controller.updateRoom(req2, res2);

    const req3 = {
        params: {
            id: id
        }
    }

    let res3 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const updatedRoom  = await controller.getRoomById(req3, res3);
    expect(updatedRoom[0].name).toEqual("updated room");
})

// delete room
it("Test delete room", async () => {
    const req = {
        body: {
            name: "test room",
        }
    }
    let res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const { id } = await controller.createRoom(req, res);

    const req2 = {
        params: {
            id: id
        }
    }

    let res2 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await controller.deleteRoom(req2, res2);

    let res3 = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    const deletedRoom = await controller.getRoomById(req2, res3);
    expect(deletedRoom).toEqual([]);
})