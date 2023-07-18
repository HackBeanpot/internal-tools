import { Room } from "../../types.js";
import roomsModel from "../models/rooms-models.js";

export const getRoom = async () => 
  (await (roomsModel())).find();

export const getRoomById = async (roomID: string) => 
  (await (roomsModel())).find({_id: roomID});

export const getRoomByName =async (roomName: string) =>
  (await (roomsModel())).findOne({name: roomName});  

export const createRoom = async (room: Room) => 
  (await (roomsModel())).create(room); 

export const updateRoom = async (room: Room, roomID: string) => 
  (await (roomsModel())).updateOne({_id: roomID}, room); 

export const deleteRoom = async (roomID: string) => 
  (await (roomsModel())).deleteOne({_id: roomID}); 

export const deleteAllRooms = async () => 
  (await roomsModel()).deleteMany({})