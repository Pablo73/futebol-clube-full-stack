import { NextFunction, Request, Response } from 'express';
import UsersService from '../services/loginService';
import { NotUnauthorizedException } from '../exections';

class UsersController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const token = await UsersService.validPassoword(body);
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  public static async getRole(req: Request, res: Response, next: NextFunction) {
    const { headers: { authorization } } = req;
    if (!authorization) {
      throw new NotUnauthorizedException('Token not found');
    }
    try {
      const roleValue = await UsersService.getRole(authorization);
      return res.status(200).json({ role: roleValue });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
