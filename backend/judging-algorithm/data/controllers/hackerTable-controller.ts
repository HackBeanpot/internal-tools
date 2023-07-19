import * as hackerTableDao from "../dao/hackerTable-dao.js";

const getHackerTable = async (_req: any, res: any) => {
    const hackerTable = await hackerTableDao.getHackerTable();
    res.json(hackerTable)
    return hackerTable;
  };
  
const getHackerTableById = async (req: any, res: any) => {
  const hackerTableId = req.params.id;
  const hackerTable = await hackerTableDao.getHackerTableById(hackerTableId);
  res.json(hackerTable);
  return hackerTable;
};

const updateHackerTable = async (req: any, res: any) => {
  const hackerTable = req.body;
  const hackerTableId = req.params.id;
  const update = await hackerTableDao.updateJudge(judge, hackerTableId);
  res.status(200).json({
    message: update
  });
  return update;
};

const createHackerTable = async (req: any, res: any) => {
  const hackerTable = req.body;
  const create = await hackerTableDao.createHackerTable(hackerTable);
  res.json(create);
  return create;
};

const deleteAllHackerTable = async (_req: any, res: any) => {
  const deleted = await hackerTableDao.deleteAllHackerTable()
  res.json(deleted);
  return deleted;
};

export default {getHackerTable, getHackerTableById, updateHackerTable, createHackerTable, deleteAllHackerTable}