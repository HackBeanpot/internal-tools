import express from 'express';
import controller from '../data/controllers/judges-controller.js';

const router = express.Router();

router.get('/judges', controller.getJudge);
router.get('/judges/:id', controller.getJudgeById);
router.get('/judges/:name', controller.getJudgeByName)
router.put('/judges/:id', controller.updateJudge);
router.delete('/judges/:id', controller.deleteJudge);
router.delete('/judges', controller.deleteAllJudges);
router.post('/judges', controller.createJudge);

export default router;