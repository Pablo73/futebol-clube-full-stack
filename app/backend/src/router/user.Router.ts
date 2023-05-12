import { Router } from 'express';
import { UsersController } from '../controller';

const usersRouter = Router();

usersRouter.post('/', UsersController.login);

export default usersRouter;
