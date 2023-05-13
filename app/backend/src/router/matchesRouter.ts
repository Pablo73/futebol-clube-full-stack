import { Router } from 'express';
import { MatchesController } from '../controller';

const matchesRouter = Router();

matchesRouter.get('/', MatchesController.getAll);

export default matchesRouter;
