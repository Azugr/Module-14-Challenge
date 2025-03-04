import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user';
import { TicketFactory } from './ticket';

// Initialize Sequelize with the database connection
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

// Initialize User and Ticket models
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// Define associations between User and Ticket models
User.hasMany(Ticket, { foreignKey: 'assignedUserId' });
Ticket.belongsTo(User, { foreignKey: 'assignedUserId', as: 'assignedUser' });

// Export the initialized Sequelize instance and models
export { sequelize, User, Ticket };