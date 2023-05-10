import { Router } from 'express';
import TeamsController from '../controller/teams.controller';

const teamsRouter = Router();

teamsRouter.get('/', TeamsController.getAll);

export default teamsRouter;
