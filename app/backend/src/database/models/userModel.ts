import { DataTypes, Model } from 'sequelize';
import sequelize from '.';

export interface UsersAtributes {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export type UsersCreateAtributes = Omit<UsersAtributes, 'id'>;

class UsersModel extends Model<UsersAtributes, UsersCreateAtributes> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UsersModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

}, {
  underscored: true,
  timestamps: false,
  modelName: 'users',
  sequelize,
});

export default UsersModel;
