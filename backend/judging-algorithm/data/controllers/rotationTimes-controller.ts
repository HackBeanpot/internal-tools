import * as rotationTimesDao from "../dao/rotationTimes-dao.js";

  const getRotationTime = async (_req: any, res: any) => {
    const rotationTimes = await rotationTimesDao.getRotationTime();
    res.json(rotationTimes);
    return rotationTimes;
  };

  const getRotationTimeById = async (req: any, res: any) => {
    const rotationTimeId = req.params.id;
    const rotationTime = await rotationTimesDao.getRotationTimeById(rotationTimeId);
    res.json(rotationTime);
    return rotationTime;
  };

  const createRotationTime = async (req: any, res: any) => {
    const rotationTime = req.body;
    const create = await rotationTimesDao.createRotationTime(rotationTime);
    res.json(create);
    return create;
  };

  const updateRotationTime = async (req: any, res: any) => {
    const rotationTime = req.body;
    const rotationTimeId = req.params.id;
    const update = await rotationTimesDao.updateRotationTime(rotationTime, rotationTimeId);
    res.json(update);
    return update;
  };

  const deleteRotationTime = async (req: any, res: any) => {
    const rotationTimeId = req.params.id;
    const deleted = await rotationTimesDao.deleteRotationTime(rotationTimeId);
    res.json(deleted);
    return deleted;
  };


export default {getRotationTime, getRotationTimeById, createRotationTime, updateRotationTime, deleteRotationTime};