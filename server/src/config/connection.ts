import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

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
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD || '', {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialectOptions: {
        ssl: process.env.DB_SSL === 'true' ? {
          require: true,
          rejectUnauthorized: false,
        } : false,
      },
    });

export { sequelize };