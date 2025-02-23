import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { UserFactory } from '../models/user.js';
import { TicketFactory } from '../models/ticket.js';

dotenv.config();

// **Initialize Sequelize**
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      },
    })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
      },
    });

// **Initialize Models**
const User = UserFactory(sequelize);
const Ticket = TicketFactory(sequelize);

// **Test Database Connection Before Syncing**
sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to database:', process.env.DATABASE_URL || process.env.DB_NAME))
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);  // Exit if connection fails
  });

// **Sync Database**
sequelize
  .sync()
  .then(() => console.log('🚀 Database synced!'))
  .catch((err) => {
    console.error('❌ Database sync failed:', err);
    process.exit(1);  // Exit if sync fails
  });

// **Export models along with Sequelize**
export { sequelize, User, Ticket };
