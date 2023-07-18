import express from 'express';
import controller from '../data/controllers/rooms-controller.js';

const router = express.Router();

router.get("/rooms", controller.getRoom);
router.get("/rooms/:id", controller.getRoomById);
router.put("/rooms", controller.updateRoom);
router.post("/rooms", controller.createRoom)
router.delete("/rooms/:id", controller.deleteRoom);
router.delete("/rooms", controller.deleteAllRooms);

export default router;