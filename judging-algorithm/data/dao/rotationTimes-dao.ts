import { RotationTimes } from "../../types";
import rotationTimesModel from "../models/rotationTimes-models";

export const getRotationTime = async () => 
  await rotationTimesModel.find();

export const getRotationTimeById = async (rotationTimeID: string) => 
  await rotationTimesModel.find({_id: rotationTimeID});

export const getRotationTimeByName =async (rotationTimeName: string) =>
  await rotationTimesModel.findOne({name: rotationTimeName});  

export const createRotationTime = async (rotationTime: RotationTimes) => 
  await rotationTimesModel.create(rotationTime); 

export const updateRotationTime = async (rotationTime: RotationTimes, rotationTimesID: string) => 
  await rotationTimesModel.updateOne({_id: rotationTimesID}, rotationTime); 

export const deleteRotationTime = async (rotationTimesID: string) => 
  await rotationTimesModel.deleteOne({_id: rotationTimesID}); 