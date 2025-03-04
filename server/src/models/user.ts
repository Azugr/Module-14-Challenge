import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define the attributes for creating a User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Define the User model factory function
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );

  return User;
}