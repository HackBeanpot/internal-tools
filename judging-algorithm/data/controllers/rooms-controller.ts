import * as roomsDao from "../dao/rooms-dao";

const RoomsController = (app) => {
  const getRoom = async (req, res) => {
    const rooms = await roomsDao.getRoom();
    res.json(rooms);
    return rooms;
  };

  const getRoomById = async (req, res) => {
    const roomsId = req.params.roomsID;
    const room = await roomsDao.getRoomById(roomsId);
    res.json(room);
    return room;
  };

  const getRoomByName = async (req, res) => {
    const roomsName = req.params.roomsName;
    const room = await roomsDao.getRoomByName(roomsName);
    res.json(room);
    return room;
  };

  const createRoom = async (req, res) => {
    const room = req.body;
    const create = await roomsDao.createRoom(room);
    res.json(create);
    return create;
  };

  const updateRoom = async (req, res) => {
    const room = req.body;
    const update = await roomsDao.updateRoom(room._id, room);
    res.json(update);
    return update;
  };

  const deleteRoom = async (req, res) => {
    const room = req.body;
    const deleted = await roomsDao.deleteRoom(room._id);
    res.json(deleted);
    return deleted;
  };

  app.get("/api/rooms", getRoom);
  app.get("/api/rooms/:roomID", getRoomById);
  app.get("/api/rooms/:roomName", getRoomByName);
  app.put("/api/rooms", updateRoom);
  app.post("/api/rooms", createRoom)
  app.delete("/api/rooms", deleteRoom);
};

export default RoomsController;