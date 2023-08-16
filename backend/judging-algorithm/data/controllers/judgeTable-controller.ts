import * as judgeTableDao from "../dao/judgeTable-dao.js";

const getJudgeTable = async (_req: any, res: any) => {
    const judgeTable = await judgeTableDao.getJudgeTable();
    res.json(judgeTable)
    return judgeTable;
  };
  
const getJudgeTableById = async (req: any, res: any) => {
  const judgeTableId = req.params.id;
  const judgeTable = await judgeTableDao.getJudgeTableById(judgeTableId);
  res.json(judgeTable);
  return judgeTable;
};

const updateJudgeTable = async (req: any, res: any) => {
  const judgeTable = req.body;
  const judgeTableId = req.params.id;
  const update = await judgeTableDao.updateJudgeTable(judgeTable, judgeTableId);
  res.status(200).json({
    message: update
  });
  return update;
};

const createJudgeTable = async (req: any, res: any) => {
  const judgeTable = req.body;
  const create = await judgeTableDao.createJudgeTable(judgeTable);
  res.json(create);
  return create;
};

const deleteJudgeTable = async (req: any, res: any) => {
  const judgeTableId = req.params.id;
  const deleted = await judgeTableDao.deleteJudgeTable(judgeTableId)
  res.json(deleted);
  return deleted;
};

const deleteAllJudgeTable = async (_req: any, res: any) => {
  const deleted = await judgeTableDao.deleteAllJudgeTable()
  res.json(deleted);
  return deleted;
};

export default {getJudgeTable, getJudgeTableById, updateJudgeTable, createJudgeTable, deleteJudgeTable, deleteAllJudgeTable}