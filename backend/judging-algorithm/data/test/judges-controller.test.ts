// import db from './db.js'
// import controller from '../controllers/judges-controller.js'

// beforeAll(async () => await db.connectDatabase())
// afterAll(async () => {
//     await db.clearDatabase();
//     await db.closeDatabase();
// })

// // create judge
// it("Test create judge", async () => {
//     const req = {
//         body: {
//             name: "test judge",
//             inPerson: true
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     console.log("req judge: "+ req.body.name);
//     console.log("res: " + res);

//     const { id } = await controller.createJudge(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }
//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const judge  = await controller.getJudgeById(req2, res2);
//     console.log(judge)
//     expect(judge[0].name).toEqual("test judge");
// })

// // update judge
// it("Test update judge", async () => {
//     const req = {
//         body: {
//             name: "test judge",
//             inPerson: true
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

//     const { id } = await controller.createJudge(req, res);

//     const req2 = {
//         params: {
//             id: id
//         },
//         body: {
//             name: "updated judge",
//             inPerson: true
//         }
//     }

//     await controller.updateJudge(req2, res2);

//     const req3 = {
//         params: {
//             id: id
//         }
//     }

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const updatedJudge  = await controller.getJudgeById(req3, res3);
//     expect(updatedJudge[0].name).toEqual("updated judge");
// })

// // delete judge
// it("Test delete judge", async () => {
//     const req = {
//         body: {
//             name: "test judge",
//             inPerson: true
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createJudge(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }

//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     await controller.deleteJudge(req2, res2);

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const deletedJudge = await controller.getJudgeById(req2, res3);
//     expect(deletedJudge).toEqual([]);
// })