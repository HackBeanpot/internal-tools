import * as judgesDao from "../dao/judges-dao";

const JudgesController = (app) => {
  const getJudge = async (req, res) => {
    const judges = await judgesDao.getJudge();
    res.json(judges);
    return judges;
  };

  const getJudgeById = async (req, res) => {
    const judgesId = req.params.judgesID;
    const judge = await judgesDao.getJudgeById(judgesId);
    res.json(judge);
    return judge;
  };

  const getJudgeByName = async (req, res) => {
    const judgesName = req.params.judgesName;
    const judge = await judgesDao.getJudgeByName(judgesName);
    res.json(judge);
    return judge;
  };

  const createJudge = async (req, res) => {
    const judge = req.body;
    const create = await judgesDao.createJudge(judge);
    res.json(create);
    return create;
  };

  const updateJudge = async (req, res) => {
    const judge = req.body;
    const update = await judgesDao.updateJudge(judge._id, judge);
    res.json(update);
    return update;
  };

  const deleteJudge = async (req, res) => {
    const judge = req.body;
    const deleted = await judgesDao.deleteJudge(judge._id);
    res.json(deleted);
    return deleted;
  };

  app.get("/api/judges", getJudge);
  app.get("/api/judges/:judgesID", getJudgeById);
  app.get("/api/judges/:judgesName", getJudgeByName);
  app.put("/api/judges", updateJudge);
  app.post("/api/judges", createJudge)
  app.delete("/api/judges", deleteJudge);
};

export default JudgesController;