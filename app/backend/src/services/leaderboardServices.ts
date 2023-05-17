import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';
import getTeamsHome from './query/queryGetTeamsHome';
import getAllAway from './query/queryGetAllTeamsAway';

class LeaderBoard {
  public static async getAllHome() {
    const allTeams = await sequelize.query(getTeamsHome, { type: QueryTypes.SELECT });
    return allTeams;
  }

  public static async getAllAway() {
    const allTeams = await sequelize.query(getAllAway, { type: QueryTypes.SELECT });
    return allTeams;
  }
}

export default LeaderBoard;
