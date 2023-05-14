import { NextFunction, Request, Response } from 'express';
import { BadRequestException, NotUnauthorizedException } from '../exections';

class UsersValidate {
  public static existEmailAndPassword(req: Request, _res: Response, next: NextFunction): void {
    const { body } = req;
    if (!body.email || !body.password) {
      throw new BadRequestException('All fields must be filled');
    }
    return next();
  }

  public static validateEmail(req: Request, _res: Response, next: NextFunction): void {
    const { body } = req;
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!regexEmail.test(body.email)) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
    return next();
  }

  public static validatePassword(req: Request, _res: Response, next: NextFunction): void {
    const { body } = req;

    if (body.password.length < 6) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
    return next();
  }
}

export default UsersValidate;
