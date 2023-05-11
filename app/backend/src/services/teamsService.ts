import TeamsModel, { TeamsAtributes } from '../database/models/teamsModel';
import { NotFoundException } from '../exections';

class TeamsService {
  public static async getAll(): Promise<TeamsAtributes[]> {
    const allTeams = await TeamsModel.findAll();
    return allTeams;
  }

  public static async getById(id: number): Promise<TeamsAtributes> {
    const [teams] = await TeamsModel.findAll({ where: { id } });
    if (!teams) {
      throw new NotFoundException('Team not found!');
    }
    return teams;
  }
}

export default TeamsService;
