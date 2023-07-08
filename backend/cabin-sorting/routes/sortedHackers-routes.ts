import express from 'express';
import controller from '../controllers/sortedHackers-controller.js';

const router = express.Router();

router.get('/sortedHackers', controller.getSortedHackers);


// router.get('/judges/:id', controller.getJudgeById);
// router.get('/judges/:name', controller.getJudgeByName)
// router.put('/judges/:id', controller.updateJudge);
// router.delete('/judges/:id', controller.deleteJudge);
// router.post('/judges', controller.createJudge);

export default router;
