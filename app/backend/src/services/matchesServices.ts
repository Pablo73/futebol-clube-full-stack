import BadRequestException from '../exections/BadRequest';
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

  public static async getAllMatches(value: string): Promise<MatchesAtributes[]> {
    if (value !== 'true' && value !== 'false') {
      throw new BadRequestException();
    }
    const boolen = value === 'true';

    const allMatches = await MatchesModel.findAll({
      where: { inProgress: boolen },
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

  public static async MatchesFinish(idVlaue: number): Promise<string> {
    const promise = await MatchesModel.update({ inProgress: false }, { where: { id: idVlaue } });
    Promise.resolve(promise);
    return 'Finished';
  }
}

export default MatchesServices;
