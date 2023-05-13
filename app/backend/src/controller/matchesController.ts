import { Request, Response } from 'express';
import MatchesServices from '../services/matchesServices';

class MatchesController {
  public static async getAll(_req: Request, res: Response) {
    const matches = await MatchesServices.getAll();
    return res.status(200).json(matches);
  }
}

export default MatchesController;
