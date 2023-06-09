import BadRequestException from '../exections/BadRequest';
import MatchesModel, { MatchesAtributes, MatchesCreateAtributes }
  from '../database/models/matchesModel';
import TeamModel from '../database/models/teamsModel';
import { updateGoals } from '../types/typeMatches';
import NotFoundException from '../exections/NotFound';

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
    await MatchesModel.update({ inProgress: false }, { where: { id: idVlaue } });
    return 'Finished';
  }

  public static async MatchesUpdateGoals(
    idVlaue: number,
    goals: updateGoals,
  ): Promise<string> {
    const updatedGoals = await MatchesModel.update(
      {
        homeTeamGoals: goals.homeTeamGoals, awayTeamGoals: goals.awayTeamGoals },
      { where: { id: idVlaue } },
    );
    Promise.resolve(updatedGoals);
    return 'updated Goals';
  }

  public static async createMatches(newMatche: MatchesCreateAtributes): Promise<MatchesAtributes> {
    try {
      const matche = await MatchesModel.create(newMatche);
      Promise.resolve(matche);
      return matche;
    } catch (error) {
      throw new NotFoundException('There is no team with such id!');
    }
  }
}

export default MatchesServices;
