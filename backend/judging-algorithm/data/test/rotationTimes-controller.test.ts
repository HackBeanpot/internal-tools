// import db from './db.js'
// import controller from '../controllers/rotationTimes-controller.js'

// beforeAll(async () => await db.connectDatabase())
// afterAll(async () => {
//     await db.clearDatabase();
//     await db.closeDatabase();
// })

// // create rotationTimes
// it("Test create rotationTimes", async () => {
//     const req = {
//         body: {
//             startTime: "12:00",
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createRotationTime(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }
//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const rotationTime  = await controller.getRotationTimeById(req2, res2);
//     expect(rotationTime[0].startTime).toEqual("12:00");
// })

// // update rotationTime
// it("Test update rotationTime", async () => {
//     const req = {
//         body: {
//             startTime: "12:00",
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };
//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createRotationTime(req, res);

//     const req2 = {
//         params: {
//             id: id
//         },
//         body: {
//             startTime: "12:20",
//         }
//     }

//     await controller.updateRotationTime(req2, res2);

//     const req3 = {
//         params: {
//             id: id
//         }
//     }

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const updatedRotationTime  = await controller.getRotationTimeById(req3, res3);
//     expect(updatedRotationTime[0].startTime).toEqual("12:20");
// })

// // delete judge
// it("Test delete rotationTime", async () => {
//     const req = {
//         body: {
//             startTime: "12:00",
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createRotationTime(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }

//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     await controller.deleteRotationTime(req2, res2);

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const deletedRotationTime = await controller.getRotationTimeById(req2, res3);
//     expect(deletedRotationTime).toEqual([]);
// })