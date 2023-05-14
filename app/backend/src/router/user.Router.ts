import { Router } from 'express';
import { UsersController } from '../controller';
import ValidateToke from '../middlewares/validationToken';
import UsersValidate from '../middlewares/validationUser';

const usersRouter = Router();

usersRouter.post(
  '/',
  UsersValidate.existEmailAndPassword,
  UsersValidate.validateEmail,
  UsersValidate.validatePassword,
  UsersController.login,
);
usersRouter.get('/role', ValidateToke.isValid, UsersController.getRole);

export default usersRouter;
