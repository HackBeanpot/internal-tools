import * as rotationTimesDao from "../dao/rotationTimes-dao.js";

  const getRotationTime = async (_req: any, res: any) => {
    const rotationTimes = await rotationTimesDao.getRotationTime();
    res.json(rotationTimes);
    return rotationTimes;
  };

  const getRotationTimeById = async (req: any, res: any) => {
    const rotationTimeId = req.params.rotationTimeID;
    const rotationTime = await rotationTimesDao.getRotationTimeById(rotationTimeId);
    res.json(rotationTime);
    return rotationTime;
  };

  const getRotationTimeByName = async (req: any, res: any) => {
    const rotationTimeName = req.params.rotationTimeName;
    const rotationTime = await rotationTimesDao.getRotationTimeByName(rotationTimeName);
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
    const update = await rotationTimesDao.updateRotationTime(rotationTime._id, rotationTime);
    res.json(update);
    return update;
  };

  const deleteRotationTime = async (req: any, res: any) => {
    const rotationTime = req.body;
    const deleted = await rotationTimesDao.deleteRotationTime(rotationTime._id);
    res.json(deleted);
    return deleted;
  };


export default {getRotationTime, getRotationTimeById, getRotationTimeByName, createRotationTime, updateRotationTime, deleteRotationTime};