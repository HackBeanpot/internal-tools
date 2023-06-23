import * as teamsDao from "../dao/teams-dao";

const TeamsController = (app) => {
  const getTeam = async (req, res) => {
    const teams = await teamsDao.getTeam();
    res.json(teams);
    return teams;
  };

  const getTeamById = async (req, res) => {
    const teamID = req.params.teamID;
    const team = await teamsDao.getTeamsById(teamID);
    res.json(team);
    return team;
  };

  const getTeamByName = async (req, res) => {
    const teamName = req.params.teamName;
    const team = await teamsDao.getTeamByName(teamName);
    res.json(team);
    return team;
  };

  const createTeam = async (req, res) => {
    const team = req.body;
    const create = await teamsDao.createTeam(team);
    res.json(create);
    return create;
  };

  const updateTeam = async (req, res) => {
    const team = req.body;
    const update = await teamsDao.updateTeam(team._id, team);
    res.json(update);
    return update;
  };

  const deleteTeam = async (req, res) => {
    const team = req.body;
    const deleted = await teamsDao.deleteTeam(team._id);
    res.json(deleted);
    return deleted;
  };

  app.get("/api/team", getTeam);
  app.get("/api/team/:teamID", getTeamById);
  app.get("/api/team/:teamName", getTeamByName);
  app.put("/api/team", updateTeam);
  app.post("/api/team", createTeam)
  app.delete("/api/team", deleteTeam);
};

export default TeamsController;