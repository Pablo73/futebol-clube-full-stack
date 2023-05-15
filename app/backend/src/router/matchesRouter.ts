import { Router } from 'express';
import { MatchesController } from '../controller';
import ValidateToke from '../middlewares/validationToken';
import ValidationNewMatche from '../middlewares/validationCreateMatche';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAllMatches);
matchesRouter.patch('/:id/finish', ValidateToke.isValid, MatchesController.MatchesFinish);
matchesRouter.patch('/:id', ValidateToke.isValid, MatchesController.MatchesUpdateGoals);
matchesRouter.post(
  '/',
  ValidateToke.isValid,
  ValidationNewMatche.isValid,
  MatchesController.createMatches,
);

export default matchesRouter;
