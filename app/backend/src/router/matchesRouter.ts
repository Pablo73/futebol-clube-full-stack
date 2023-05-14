import { Router } from 'express';
import { MatchesController } from '../controller';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAllMatches);

export default matchesRouter;
