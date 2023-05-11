import UsersValidate from '../middlewares/validationUser';
import UsersModel, { UsersAtributes } from '../database/models/userModel';
import { LoginBody } from '../types/typeUsers';
import NotFoundException from '../exections/NotFound';

class UsersService {
  public static async getAll(): Promise<UsersAtributes[]> {
    const allUsers = await UsersModel.findAll();
    return allUsers;
  }

  public static async validateUser(body: LoginBody): Promise<boolean> {
    UsersValidate.validateAttributesUser(body);
    const checkingEmailAndPassword = (await UsersService.getAll())
      .some((ele: UsersAtributes): true | undefined => {
        if (ele.email === body.email && ele.password === body.password) {
          return true;
        }
        return undefined;
      });
    if (!checkingEmailAndPassword) {
      throw new NotFoundException('Invalid email or password');
    }
    return checkingEmailAndPassword;
  }
}

export default UsersService;
