import { NextFunction, Request, Response } from 'express';
import UnprocessableEntity from '../exections/UnprocessableEntity';
// import { NotFoundException } from '../exections';
// import TeamsService from '../services';

class ValidationNewMatche {
  public static async isValid(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { body } = req;
    if (body.homeTeamId === body.awayTeamId) {
      throw new UnprocessableEntity(
        'It is not possible to create a match with two equal teams',
      );
    }
    return next();
  }

  // public static async verific(req: Request, _res: Response, next: NextFunction): Promise<void> {
  //   const { body } = req;
  //   const getTeams = await TeamsService.getAll();
  //   const arrayTEams = [+body.homeTeamId, +body.awayTeamId];

  //   const valueVerific = arrayTEams.some((eleArray) =>
  //     getTeams.some((eleObject) => eleArray === eleObject.id));

  //   Promise.resolve(valueVerific);

  //   if (!valueVerific) {
  //     throw new NotFoundException('There is no team with such id!');
  //   }
  //   return next();
  // }
}

export default ValidationNewMatche;
