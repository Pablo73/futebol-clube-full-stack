import { LoginBody } from '../types/typeUsers';
import { BadRequestException } from '../exections';

class UsersValidate {
  private static validateEmail(email: string): void {
    if (!email || !email.includes('@') || !email.includes('.com')) {
      throw new BadRequestException('All fields must be filled');
    }
  }

  private static validatePassword(password: string): void {
    if (!password || password.length > 6) {
      throw new BadRequestException('All fields must be filled');
    }
  }

  public static validateAttributesUser(user: LoginBody): void {
    UsersValidate.validateEmail(user.email);
    UsersValidate.validatePassword(user.password);
  }
}

export default UsersValidate;
