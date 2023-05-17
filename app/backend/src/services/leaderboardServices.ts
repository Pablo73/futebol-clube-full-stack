import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import getTeamsHome from './query/queryGetTeamsHome';
import getAllAway from './query/queryGetAllTeamsAway';
import getAll from './query/queryGetAll';

class LeaderBoardService {
  public static async getAllHome() {
    const allTeams = await sequelize.query(getTeamsHome, { type: QueryTypes.SELECT });
    return allTeams;
  }

  public static async getAllAway() {
    const allTeams = await sequelize.query(getAllAway, { type: QueryTypes.SELECT });
    return allTeams;
  }

  public static async getAll() {
    const allTeams = await sequelize.query(getAll, { type: QueryTypes.SELECT });
    return allTeams;
  }
}

export default LeaderBoardService;
