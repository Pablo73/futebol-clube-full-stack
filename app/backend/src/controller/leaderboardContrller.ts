import { NextFunction, Request, Response } from 'express';
import { LeaderBoard } from '../services';

class LeaderboardController {
  public static async getAllHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoard.getAllHome();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }

  public static async getAllAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoard.getAllAway();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
