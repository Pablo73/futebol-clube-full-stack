import { DataTypes, Model } from 'sequelize';
import sequelize from '.';
import TeamsModel from './teamsModel';

export interface MatchesAtributes {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchesCreateAtributes = {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
};

class MatchesModel extends Model<MatchesAtributes, MatchesCreateAtributes> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress:boolean;
}

MatchesModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'teams',
      key: 'id',
    },
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  underscored: true,
  timestamps: false,
  modelName: 'matches',
  sequelize,
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'home_team_id', as: 'homeTeam',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'home_team_id', as: 'homeTeam',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'away_team_id', as: 'awayTeam',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'away_team_id', as: 'awayTeam',
});

export default MatchesModel;
