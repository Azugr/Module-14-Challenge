import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define the attributes for the Ticket model
interface TicketAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  assignedUserId?: number; 
}

// Define the creation attributes for the Ticket model
interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

// Define the Ticket model class
export class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public assignedUserId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Function to initialize the Ticket model
export function TicketFactory(sequelize: Sequelize): typeof Ticket {
  Ticket.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignedUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'tickets',
      modelName: 'Ticket',
      timestamps: false,
      underscored: true,
      freezeTableName: true,
    }
  );

  return Ticket;
}