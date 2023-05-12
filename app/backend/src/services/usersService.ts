import { LoginBody } from '../types/typeUsers';
import UsersModel, { UsersAtributes } from '../database/models/userModel';

class UsersService {
  public static async getEmail(value: LoginBody): Promise<UsersAtributes | undefined> {
    const allUsers = await UsersModel.findOne({ where: { email: value.email } });
    if (allUsers) {
      return allUsers;
    }
  }
}

export default UsersService;
