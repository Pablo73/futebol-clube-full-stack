import { Router } from 'express';
import { LeaderboardController } from '../controller';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', LeaderboardController.getAllHome);
leaderboardRouter.get('/away', LeaderboardController.getAllAway);

export default leaderboardRouter;
