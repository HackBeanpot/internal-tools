// import db from './db.js'
// import controller from '../controllers/teams-controller.js'

// beforeAll(async () => await db.connectDatabase())
// afterAll(async () => {
//     await db.clearDatabase();
//     await db.closeDatabase();
// })

// // create team
// it("Test create team", async () => {
//     const req = {
//         body: {
//             name: "test team",
//             liveDemo: "yes"
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createTeam(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }
//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const team  = await controller.getTeamById(req2, res2);
//     expect(team[0].name).toEqual("test team");
// })

// // update team
// it("Test update team", async () => {
//     const req = {
//         body: {
//             name: "test team",
//             liveDemo: "yes"
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

//     const { id } = await controller.createTeam(req, res);

//     const req2 = {
//         params: {
//             id: id
//         },
//         body: {
//             name: "updated team",
//             inPerson: true
//         }
//     }

//     await controller.updateTeam(req2, res2);

//     const req3 = {
//         params: {
//             id: id
//         }
//     }

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const updatedTeam  = await controller.getTeamById(req3, res3);
//     expect(updatedTeam[0].name).toEqual("updated team");
// })

// // delete team
// it("Test delete team", async () => {
//     const req = {
//         body: {
//             name: "test team",
//             liveDemo: "yes"
//         }
//     }
//     let res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const { id } = await controller.createTeam(req, res);

//     const req2 = {
//         params: {
//             id: id
//         }
//     }

//     let res2 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     await controller.deleteTeam(req2, res2);

//     let res3 = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn()
//     };

//     const deletedTeam = await controller.getTeamById(req2, res3);
//     expect(deletedTeam).toEqual([]);
// })