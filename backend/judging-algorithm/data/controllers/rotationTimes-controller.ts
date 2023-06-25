import * as rotationTimesDao from "../dao/rotationTimes-dao";

const RotationTimesController = (app) => {
  const getRotationTime = async (req, res) => {
    const rotationTimes = await rotationTimesDao.getRotationTime();
    res.json(rotationTimes);
    return rotationTimes;
  };

  const getRotationTimeById = async (req, res) => {
    const rotationTimeId = req.params.rotationTimeID;
    const rotationTime = await rotationTimesDao.getRotationTimeById(rotationTimeId);
    res.json(rotationTime);
    return rotationTime;
  };

  const getRotationTimeByName = async (req, res) => {
    const rotationTimeName = req.params.rotationTimeName;
    const rotationTime = await rotationTimesDao.getRotationTimeByName(rotationTimeName);
    res.json(rotationTime);
    return rotationTime;
  };

  const createRotationTime = async (req, res) => {
    const rotationTime = req.body;
    const create = await rotationTimesDao.createRotationTime(rotationTime);
    res.json(create);
    return create;
  };

  const updateRotationTime = async (req, res) => {
    const rotationTime = req.body;
    const update = await rotationTimesDao.updateRotationTime(rotationTime._id, rotationTime);
    res.json(update);
    return update;
  };

  const deleteRotationTime = async (req, res) => {
    const rotationTime = req.body;
    const deleted = await rotationTimesDao.deleteRotationTime(rotationTime._id);
    res.json(deleted);
    return deleted;
  };

  app.get("/api/rotationTime", getRotationTime);
  app.get("/api/rotationTime/:rotationTimeID", getRotationTimeById);
  app.get("/api/rotationTime/:rotationTimeName", getRotationTimeByName);
  app.put("/api/rotationTime", updateRotationTime);
  app.post("/api/rotationTime", createRotationTime)
  app.delete("/api/rotationTime", deleteRotationTime);
};

export default RotationTimesController;