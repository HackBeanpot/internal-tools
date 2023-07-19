import express from 'express';
import controller from '../data/controllers/hackerTable-controller.js';

const router = express.Router();

router.get('/hackerTable', controller.getHackerTable);
router.get('/hackerTable/:id', controller.getHackerTableById);
router.put('/hackerTable/:id', controller.);
router.delete('/hackerTable', controller.deleteAllHackerTable);
router.post('/hackerTable', controller.createHackerTable);

export default router;