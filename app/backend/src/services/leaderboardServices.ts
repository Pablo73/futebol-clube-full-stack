import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import queryGetAll from './query/queryGetAll';

class LeaderBoard {
  public static async getAll() {
    const allTeams = await sequelize.query(queryGetAll, { type: QueryTypes.SELECT });
    return allTeams;
  }
}

export default LeaderBoard;
