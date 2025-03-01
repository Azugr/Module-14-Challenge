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
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(process.env.DATABASE_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

// **Test Database Connection Before Syncing**
sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to database:', 
    process.env.DATABASE_URL || process.env.DATABASE_NAME))
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
    process.exit(1); 
  });

export { sequelize };