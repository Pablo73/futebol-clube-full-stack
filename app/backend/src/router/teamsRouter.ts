import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAll);
teamsRouter.get('/:id', TeamsController.getById);

export default teamsRouter;
