import { Router } from 'express';
import { MatchesController } from '../controller';
import ValidateToke from '../middlewares/validationToken';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAllMatches);
matchesRouter.patch('/:id/finish', ValidateToke.isValid, MatchesController.MatchesFinish);

export default matchesRouter;
