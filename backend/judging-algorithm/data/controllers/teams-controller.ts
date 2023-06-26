import * as teamsDao from "../dao/teams-dao.js";


  const getTeam = async (_req: any, res: any) => {
    const teams = await teamsDao.getTeam();
    res.json(teams);
    return teams;
  };

  const getTeamById = async (req: any, res: any) => {
    const teamID = req.params.teamID;
    const team = await teamsDao.getTeamsById(teamID);
    res.json(team);
    return team;
  };

  const getTeamByName = async (req: any, res: any) => {
    const teamName = req.params.teamName;
    const team = await teamsDao.getTeamByName(teamName);
    res.json(team);
    return team;
  };

  const createTeam = async (req: any, res: any) => {
    const team = req.body;
    const create = await teamsDao.createTeam(team);
    res.json(create);
    return create;
  };

  const updateTeam = async (req: any, res: any) => {
    const team = req.body;
    const update = await teamsDao.updateTeam(team._id, team);
    res.json(update);
    return update;
  };

  const deleteTeam = async (req: any, res: any) => {
    const team = req.body;
    const deleted = await teamsDao.deleteTeam(team._id);
    res.json(deleted);
    return deleted;
  };

export default {getTeam, getTeamById, getTeamByName, createTeam, updateTeam, deleteTeam};