import { compareSync } from 'bcryptjs';
import Token from '../utils/token';
import { LoginBody } from '../types/typeUsers';
import UsersModel from '../database/models/userModel';
import NotUnauthorizedException from '../exections/Unauthorized';

class UsersService {
  public static async validPassoword(value: LoginBody): Promise<string> {
    const getUsers = await UsersModel.findOne({ where: { email: value.email } });
    if (!getUsers) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
    const comapare = compareSync(value.password, getUsers.password);
    if (!comapare) {
      throw new NotUnauthorizedException('Invalid email or password');
    }
    const valueToken = Token.generateToken({ email: value.email, inssued: Date.now() });
    return valueToken;
  }

  public static async getRole(token: string): Promise<string> {
    const tokenEmail = Token.decoderToken(token);
    const getRole = await UsersModel.findOne({ where: { email: tokenEmail.email } });
    if (!getRole) {
      throw new NotUnauthorizedException('Token must be a valid token');
    }
    return getRole.role;
  }
}

export default UsersService;
