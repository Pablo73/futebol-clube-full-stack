import MatchesModel from '../database/models/matchesModel';

class LeaderBoard {
  public static async getAll() {
    const allTeams = await MatchesModel.findAll();
    return allTeams;
  }
}

export default LeaderBoard;
