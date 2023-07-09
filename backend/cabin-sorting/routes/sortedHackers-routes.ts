import express from 'express';
import controller from '../controllers/sortedHackers-controller.js';

const router = express.Router();

router.get('/sortedHackers', controller.getSortedHackers);
router.post('/sortedHackers', controller.createSortedHacker);


// router.get('/judges/:id', controller.getJudgeById);
// router.get('/judges/:name', controller.getJudgeByName)
// router.put('/sortedHackers/:id', () => {});
// router.delete('/sortedHackers/:id',  () => {});

export default router;
