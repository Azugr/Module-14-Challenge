import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import * as bcrypt from 'bcrypt';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  public checkPassword(loginPw: string): boolean {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

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
      hooks: {
        beforeCreate: async (user: User) => {
          console.log('Before create hook:', user);
          await user.setPassword(user.password);
        },
        beforeUpdate: async (user: User) => {
          console.log('Before update hook:', user);
          await user.setPassword(user.password);
        },
      },
    }
  );

  return User;
}