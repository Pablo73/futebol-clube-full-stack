import { NextFunction, Request, Response } from 'express';
import { UnprocessableEntity } from '../exections';

class ValidationNewMatche {
  public static isValid(req: Request, _res: Response, next: NextFunction): void {
    const { body } = req;
    if (+body.homeTeamId === +body.awayTeamId) {
      throw new UnprocessableEntity(
        'It is not possible to create a match with two equal teams',
      );
    }
    return next();
  }
}

export default ValidationNewMatche;
