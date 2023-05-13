import { NextFunction, Request, Response } from 'express';
import Token from '../utils/token';
import NotUnauthorizedException from '../exections/NotUnauthorized';

class ValidateToke {
  public static isValid(req: Request, _res: Response, next: NextFunction): void {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new NotUnauthorizedException('Token not found');
    }
    try {
      Token.validateToken(authorization);
      return next();
    } catch (error) {
      throw new NotUnauthorizedException('Token must be a valid token');
    }
  }
}

export default ValidateToke;
