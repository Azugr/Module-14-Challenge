import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// **Initialize Sequelize**
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      }
    })
  : new Sequelize(process.env.DB_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD || '', {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {

      },
    });

export { sequelize };
