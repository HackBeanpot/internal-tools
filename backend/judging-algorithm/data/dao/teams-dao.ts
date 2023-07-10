import { HackerTeam } from "../../types.js";
import teamsModel from "../models/teams-models.js";

export const getTeam = async () => 
  (await teamsModel()).find();

export const getTeamsById = async (teamID: string) => 
  (await teamsModel()).find({_id: teamID});

export const getTeamByName =async (teamName: string) =>
  (await teamsModel()).findOne({name: teamName});  

export const createTeam = async (team: HackerTeam) => 
  (await teamsModel()).create(team); 

export const updateTeam = async (team: HackerTeam, teamID: string) => 
  (await teamsModel()).updateOne({_id: teamID}, team); 

export const deleteTeam = async (teamID: string) =>
  (await teamsModel()).deleteOne({_id: teamID});
  