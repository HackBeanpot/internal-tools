import express from 'express';
import controller from '../data/controllers/rotationTimes-controller.js';

const router = express.Router();

router.get("/rotationTimes", controller.getRotationTime);
router.get("/rotationTimes/:rotationTimeID", controller.getRotationTimeById);
router.get("/rotationTimes/:rotationTimeName", controller.getRotationTimeByName);
router.put("/rotationTimes", controller.updateRotationTime);
router.post("/rotationTimes", controller.createRotationTime);
router.delete("/rotationTimes", controller.deleteRotationTime);

export default router;