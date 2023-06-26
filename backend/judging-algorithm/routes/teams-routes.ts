import express from 'express';
import controller from '../data/controllers/teams-controller.js';

const router = express.Router();

router.get("/teams", controller.getTeam);
router.get("/teams/:teamID", controller.getTeamById);
router.get("/teams/:teamName", controller.getTeamByName);
router.put("/teams", controller.updateTeam);
router.post("/teams", controller.createTeam)
router.delete("/teams", controller.deleteTeam);

export default router;