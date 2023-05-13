import { LoginBody } from '../types/typeUsers';
import UsersModel, { UsersAtributes } from '../database/models/userModel';

class UsersService {
  public static async getEmail(value: LoginBody): Promise<UsersAtributes | undefined> {
    const getUsers = await UsersModel.findOne({ where: { email: value.email } });
    if (getUsers) {
      return getUsers;
    }
  }

  public static async getRole(UserEmail: string): Promise<string | undefined> {
    const getRole = await UsersModel.findOne({ where: { email: UserEmail } });
    if (getRole) {
      return getRole.role;
    }
  }
}

export default UsersService;
