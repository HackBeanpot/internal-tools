import express from 'express';
import controller from '../data/controllers/rotationTimes-controller.js';

const router = express.Router();

router.get("/rotationTimes", controller.getRotationTime);
router.get("/rotationTimes/:id", controller.getRotationTimeById);
router.put("/rotationTimes/:id", controller.updateRotationTime);
router.post("/rotationTimes", controller.createRotationTime);
router.delete("/rotationTimes/:id", controller.deleteRotationTime);

export default router;