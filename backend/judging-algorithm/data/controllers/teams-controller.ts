import * as teamsDao from "../dao/teams-dao.js";

  const getTeam = async (_req: any, res: any) => {
    const teams = await teamsDao.getTeam();
    res.json(teams);
    return teams;
  };

  const getTeamById = async (req: any, res: any) => {
    const teamID = req.params.id;
    const team = await teamsDao.getTeamsById(teamID);
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
    const teamId = req.params.id;
    const update = await teamsDao.updateTeam(team, teamId);
    res.json(update);
    return update;
  };

  const deleteTeam = async (req: any, res: any) => {
    const teamId = req.params.id;
    const deleted = await teamsDao.deleteTeam(teamId);
    res.json(deleted);
    return deleted;
  };

export default {getTeam, getTeamById, createTeam, updateTeam, deleteTeam};