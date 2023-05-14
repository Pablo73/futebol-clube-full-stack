import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services';

class TeamsController {
  public static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamsService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  public static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const team = await TeamsService.getById(+id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamsController;
