import * as judgesDao from "../dao/judges-dao.js";

const getJudge = async (_req: any, res: any) => {
  const judges = await judgesDao.getJudge();
  res.json(judges)
  return judges;
};

const getJudgeById = async (req: any, res: any) => {
  const judgesId = req.params.id;
  const judge = await judgesDao.getJudgeById(judgesId);
  res.json(judge);
  return judge;
};

const getJudgeByName = async (req: any, res: any) => {
  const judgesName = req.params.name;
  const judge = await judgesDao.getJudgeByName(judgesName);
  res.json(judge);
  return judge;
};

const createJudge = async (req: any, res: any) => {
  const judge = req.body;
  let create;
  try {
    create = await judgesDao.createJudge(judge);
    res.json(create);
  }
  catch (e) {
    console.log(e)
  }
  return create;
};

const updateJudge = async (req: any, res: any) => {
  const judge = req.body;
  const judgeId = req.params.id;
  const update = await judgesDao.updateJudge(judge, judgeId);
  res.status(200).json({
    message: update
  });
  return update;
};

const deleteJudge = async (req: any, res: any) => {
  const judgeId = req.params.id;
  const deleted = await judgesDao.deleteJudge(judgeId);
  res.json(deleted);
  return deleted;
};

const deleteAllJudges = async (_req: any, res: any) => {
  const deleted = await judgesDao.deleteAllJudges()
  res.json(deleted);
  return deleted;
};



export default {getJudge, getJudgeById, getJudgeByName, createJudge, updateJudge, deleteJudge, deleteAllJudges};