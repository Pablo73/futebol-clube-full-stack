import { NextFunction, Request, Response } from 'express';
import Token from '../utils/token';
import UsersValidate from '../middlewares/validationUser';

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
}

export default UsersController;
