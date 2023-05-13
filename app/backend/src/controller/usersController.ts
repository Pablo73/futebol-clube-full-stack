import { NextFunction, Request, Response } from 'express';
import Token from '../utils/token';
import UsersValidate from '../middlewares/validationUser';
import UsersService from '../services/usersService';
import NotUnauthorizedException from '../exections/NotUnauthorized';

class UsersController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const valueToken = Token.generateToken({ email: body.email, inssued: Date.now() });
    try {
      await UsersValidate.validateAttributesUser(body);
      return res.status(200).json(valueToken);
    } catch (error) {
      next(error);
    }
  }

  public static async getRole(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      throw new NotUnauthorizedException('Token not found');
    }
    try {
      const tokenEmail = Token.decoderToken(authorization);
      const roleValue = await UsersService.getRole(tokenEmail.email);
      return res.status(200).json({ role: roleValue });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;
