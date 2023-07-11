import express from 'express';
import controller from '../controllers/sortedHackers-controller.js';

const router = express.Router();

router.get('/sortedHackers', controller.getSortedHackers);
router.post('/sortedHackers', controller.createSortedHacker);

export default router;
