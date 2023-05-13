import { Router } from 'express';
import { UsersController } from '../controller';
import ValidateToke from '../middlewares/validationToken';

const usersRouter = Router();

usersRouter.post('/', UsersController.login);
usersRouter.get('/role', ValidateToke.isValid, UsersController.getRole);

export default usersRouter;
