import { MatchesAtributes, MatchesCreateAtributes } from "../../database/models/matchesModel";

export const matches = [
    {
      id: 1,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 2,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "Avaí/Kindermann"
      },
      awayTeam: {
        teamName: "Bahia"
      }
    },
    {
      id: 2,
      homeTeamId: 2,
      homeTeamGoals: 1,
      awayTeamId: 3,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {
        teamName: "Bahia"
      },
      awayTeam: {
        teamName: "Botafogo"
      }
    }
];

export const newMatch: MatchesCreateAtributes = {
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
  }

  export const newMatchError: MatchesCreateAtributes = {
    homeTeamId: 16454,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
  }

 export const createdMatch: MatchesAtributes = {
    id: 3,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 8,
    awayTeamGoals: 2,
    inProgress: false
  }
 