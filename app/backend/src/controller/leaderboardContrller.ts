import { NextFunction, Request, Response } from 'express';
import { LeaderBoardService } from '../services';

class LeaderboardController {
  public static async getAllHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoardService.getAllHome();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }

  public static async getAllAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoardService.getAllAway();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }

  public static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const Leader = await LeaderBoardService.getAll();
      return res.status(200).json(Leader);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
