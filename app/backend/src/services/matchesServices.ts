import MatchesModel, { MatchesAtributes } from '../database/models/matchesModel';
import TeamModel from '../database/models/teamsModel';

class MatchesServices {
  public static async getAll(): Promise<MatchesAtributes[]> {
    const allMatches = await MatchesModel.findAll({
      include:
      [{ model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'] },

      { model: TeamModel,
        as: 'awayTeam',
        attributes: ['teamName'] }],
    });
    return allMatches;
  }
}

export default MatchesServices;
