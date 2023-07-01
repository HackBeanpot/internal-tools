import db from './db.js'
import controller from '../controllers/judges-controller.js'

beforeAll(async () => await db.connectDatabase())
afterAll(async () => {
    await db.clearDatabase();
    await db.closeDatabase();
})


it("Test create judge 1", async () => {
    const req = {
        body: {
            name: "test judge",
            inPerson: true
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

    const { id } = await controller.createJudge(req, res);

    const req2 = {
        params: {
            id: id
        }
    }
    const judge  = await controller.getJudgeById(req2, res2);
    expect(judge[0].name).toEqual("test judge");
})

// update judge
it("Test update judge 1", async () => {

})

// delete the judge
