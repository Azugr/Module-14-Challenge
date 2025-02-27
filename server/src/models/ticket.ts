import { DataTypes, Model, Sequelize } from 'sequelize';

export class Ticket extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: 'Todo' | 'In Progress' | 'Done';
}

export const TicketFactory = (sequelize: Sequelize) => {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tickets',
    }
  );
  return Ticket;
};
