import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import getTeamsHome from './query/queryGetTeamsHome';

class LeaderBoard {
  public static async getAll() {
    const allTeams = await sequelize.query(getTeamsHome, { type: QueryTypes.SELECT });
    return allTeams;
  }
}

export default LeaderBoard;
