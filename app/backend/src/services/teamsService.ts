import TeamsModel, { TeamsAtributes } from '../database/models/teamsModel';

class TeamsService {
  public static async getAll(): Promise<TeamsAtributes[]> {
    const newTeams = await TeamsModel.findAll();
    return newTeams;
  }
}

export default TeamsService;
