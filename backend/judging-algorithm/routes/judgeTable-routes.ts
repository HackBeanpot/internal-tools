import express from 'express';
import controller from '../data/controllers/judgeTable-controller.js';

const router = express.Router();

router.get('/judgeTable', controller.getJudgeTable);
router.get('/judgeTable/:id', controller.getJudgeTableById);
router.put('/judgeTable/:id', controller.updateJudgeTable);
router.delete('/judgeTable/:id', controller.deleteJudgeTable);
router.delete('/judgeTable', controller.deleteAllJudgeTable);
router.post('/judgeTable', controller.createJudgeTable);

export default router;