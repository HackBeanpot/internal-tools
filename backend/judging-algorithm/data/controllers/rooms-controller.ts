import * as roomsDao from "../dao/rooms-dao.js";

  const getRoom = async (_req: any, res: any) => {
    const rooms = await roomsDao.getRoom();
    res.json(rooms);
    return rooms;
  };

  const getRoomById = async (req: any, res: any) => {
    const roomsId = req.params.id;
    const room = await roomsDao.getRoomById(roomsId);
    res.json(room);
    return room;
  };

  const createRoom = async (req: any, res: any) => {
    const room = req.body;
    let create;
    try {
      create = await roomsDao.createRoom(room);
      res.json(create);
    }
    catch (e) {
      console.log(e)
    }
    return create;
  };

  const updateRoom = async (req: any, res: any) => {
    const room = req.body;
    const roomId = req.params.id;
    const update = await roomsDao.updateRoom(room, roomId);
    res.json(update);
    return update;
  };

  const deleteRoom = async (req: any, res: any) => {
    const roomId = req.params.id;
    const deleted = await roomsDao.deleteRoom(roomId);
    res.json(deleted);
    return deleted;
  };

  const deleteAllRooms = async (_req: any, res: any) => {
    const deleted = await roomsDao.deleteAllRooms();
    res.json(deleted);
    return deleted;
  };


export default {getRoom, getRoomById, createRoom, updateRoom, deleteRoom, deleteAllRooms};