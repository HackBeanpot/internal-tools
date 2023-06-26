import * as roomsDao from "../dao/rooms-dao.js";


  const getRoom = async (_req: any, res: any) => {
    const rooms = await roomsDao.getRoom();
    res.json(rooms);
    return rooms;
  };

  const getRoomById = async (req: any, res: any) => {
    const roomsId = req.params.roomsID;
    const room = await roomsDao.getRoomById(roomsId);
    res.json(room);
    return room;
  };

  const getRoomByName = async (req: any, res: any) => {
    const roomsName = req.params.roomsName;
    const room = await roomsDao.getRoomByName(roomsName);
    res.json(room);
    return room;
  };

  const createRoom = async (req: any, res: any) => {
    const room = req.body;
    const create = await roomsDao.createRoom(room);
    res.json(create);
    return create;
  };

  const updateRoom = async (req: any, res: any) => {
    const room = req.body;
    const update = await roomsDao.updateRoom(room._id, room);
    res.json(update);
    return update;
  };

  const deleteRoom = async (req: any, res: any) => {
    const room = req.body;
    const deleted = await roomsDao.deleteRoom(room._id);
    res.json(deleted);
    return deleted;
  };


export default {getRoom, getRoomById, getRoomByName, createRoom, updateRoom, deleteRoom};