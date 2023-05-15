import MatchesModel from '../database/models/matchesModel';
import TeamsModel from '../database/models/teamsModel';

class LeaderBoard {
  public static async getAll(): Promise<TeamsAtributes[]> {
    const allTeams = await MatchesModel.findAll({
      include: [{
        model: TeamsModel,
        as: 'name',
        attributes: ['teamName'],
      }],
    });
    return allTeams;
  }
}

export default LeaderBoard;
