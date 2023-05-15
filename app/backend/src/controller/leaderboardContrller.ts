import { NextFunction, Request, Response } from 'express';
import { LeaderBoard } from '../services';

class LeaderboardController {
  public static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoard.getAll();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
