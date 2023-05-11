import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export interface TeamsAtributes {
  id: number;
  teamName: string,
}

export type TeamscreateAtributes = Omit<TeamsAtributes, 'id'>;

class TeamsModel extends Model<TeamsAtributes, TeamscreateAtributes> {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },

}, {
  underscored: true,
  timestamps: false,
  modelName: 'teams',
  sequelize,
});

export default TeamsModel;
