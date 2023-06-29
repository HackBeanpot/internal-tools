jest.mock("../dao/judges-dao.js");

describe('Judges API', () => {
    test('Testing GET endpoint', async () => {
        judgesDao.getJudge.mockResolvedValue([
            { name: 'Judge A', inPerson: true },
            { name: 'Judge B', inPerson: false }
        ]);

        const res = await request(app)
            .get('/judges');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    });

    test('Testing POST endpoint', async () => {
        const newJudge = { name: 'Judge C', inPerson: true };
        judgesDao.createJudge.mockResolvedValue(newJudge);

        const res = await request(app)
            .post('/judges')
            .send(newJudge);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(newJudge);
        expect(judgesDao.createJudge).toHaveBeenCalledTimes(1);
    });

});