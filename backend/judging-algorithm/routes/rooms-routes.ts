import express from 'express';
import controller from '../data/controllers/rooms-controller.js';

const router = express.Router();

router.get("/rooms", controller.getRoom);
router.get("/rooms/:roomID", controller.getRoomById);
router.get("rooms/:roomName", controller.getRoomByName);
router.put("/rooms", controller.updateRoom);
router.post("/rooms", controller.createRoom)
router.delete("/rooms", controller.deleteRoom);

export default router;