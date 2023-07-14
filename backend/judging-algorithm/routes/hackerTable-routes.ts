import express from 'express';
import controller from '../data/controllers/hackerTable-controller.js';

const router = express.Router();

router.get('/hackerTable', controller.getHackerTable);
router.get('/hackerTable/:id', controller.getHackerTableById);
router.get('/hackerTable/:name', controller.getHackerTableByName)
router.delete('/hackerTable', controller.deleteAllHackerTable);
router.post('/hackerTable', controller.createHackerTable);

export default router;