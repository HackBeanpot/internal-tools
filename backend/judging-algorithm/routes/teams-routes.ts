import express from 'express';
import controller from '../data/controllers/teams-controller.js';

const router = express.Router();

router.get("/teams", controller.getTeam);
router.get("/teams/:id", controller.getTeamById);
router.put("/teams/:id", controller.updateTeam);
router.post("/teams", controller.createTeam)
router.delete("/teams/:id", controller.deleteTeam);

export default router;