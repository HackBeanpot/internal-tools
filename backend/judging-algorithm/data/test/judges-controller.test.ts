import db from './db.js'
import controller from '../controllers/judges-controller.js'
import { Judge } from '../../types.js';

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
    let res: Response = new Response();
    let res2: Response = new Response();

    const { id } = await controller.createJudge(req, res);
    const judge  = await controller.getJudgeById(id, res2);
    console.log(judge)
    // expect(judge.name).toEqual("test judge");
})


// jest.mock("../dao/judges-dao.ts");

// describe('Judges API', () => {
//     test('Testing GET endpoint', async () => {
//         judgesDao.getJudge.mockResolvedValue([
//             { name: 'Judge A', inPerson: true },
//             { name: 'Judge B', inPerson: false }
//         ]);

//         const res = await request(app)
//             .get('/judges');

//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toHaveLength(2);
//     });

//     test('Testing POST endpoint', async () => {
//         const newJudge = { name: 'Judge C', inPerson: true };
//         judgesDao.createJudge.mockResolvedValue(newJudge);

//         const res = await request(app)
//             .post('/judges')
//             .send(newJudge);

//         expect(res.statusCode).toEqual(200);
//         expect(res.body).toEqual(newJudge);
//         expect(judgesDao.createJudge).toHaveBeenCalledTimes(1);
//     });

// });