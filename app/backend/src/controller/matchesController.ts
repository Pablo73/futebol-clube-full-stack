import { NextFunction, Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

class MatchesController {
  public static async getAllMatches(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    try {
      if (inProgress && typeof inProgress === 'string') {
        const matchesTrue = await MatchesServices.getAllMatches(inProgress);
        return res.status(200).json(matchesTrue);
      }
      const matches = await MatchesServices.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }

  public static async MatchesFinish(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const matchesTrue = await MatchesServices.MatchesFinish(+id);
      return res.status(200).json({ message: matchesTrue });
    } catch (error) {
      next(error);
    }
  }

  public static async MatchesUpdateGoals(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedGoals = await MatchesServices.MatchesUpdateGoals(+id, body);
      return res.status(200).json({ message: updatedGoals });
    } catch (error) {
      next(error);
    }
  }

  public static async createMatches(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    try {
      const newMatche = await MatchesServices.createMatches(body);
      return res.status(201).json(newMatche);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchesController;
