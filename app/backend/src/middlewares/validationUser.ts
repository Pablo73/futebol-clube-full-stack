import { compareSync } from 'bcryptjs';
import { LoginBody } from '../types/typeUsers';
import { BadRequestException, NotUnauthorizedException } from '../exections';
import { UsersService } from '../services';

class UsersValidate {
  private static existEmail(email: string): void {
    if (!email) {
      throw new BadRequestException('All fields must be filled');
    }
  }

  private static async validateEmail(user: LoginBody): Promise<void> {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const checkingEmail = await UsersService.getEmail(user);

    if (!checkingEmail || !regexEmail.test(checkingEmail.email)) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
  }

  private static existPassword(password: string): void {
    if (!password) {
      throw new BadRequestException('All fields must be filled');
    }
  }

  private static async validatePassword(user: LoginBody): Promise<void> {
    const getPassword = await UsersService.getEmail(user);

    if (!getPassword) {
      throw new BadRequestException();
    }
    const comapare = compareSync(user.password, getPassword.password);

    if (!comapare || user.password.length < 6) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
  }

  public static async validateAttributesUser(user: LoginBody): Promise<void> {
    UsersValidate.existEmail(user.email);
    await UsersValidate.validateEmail(user);
    UsersValidate.existPassword(user.password);
    await UsersValidate.validatePassword(user);
  }
}

export default UsersValidate;
