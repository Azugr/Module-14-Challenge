
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();

// **Initialize Sequelize**
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
 
      },
    })
  : new Sequelize(process.env.DB_NAME || '', 
    process.env.DB_USER || '', 
    process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
     // port: parseInt(process.env.DB_PORT || '5432', 10),
      dialectOptions: {

      },
    });

// **Test Database Connection Before Syncing**
/*
sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to database:', 
    process.env.DATABASE_URL || process.env.DB_NAME))
  .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);  // Exit if connection fails
  });
*/
// **Sync Database**
/*
sequelize
  .sync()
  .then(() => console.log('🚀 Database synced!'))
  .catch((err) => {
    console.error('❌ Database sync failed:', err);
    process.exit(1);  // Exit if sync fails
  });
  */

export { sequelize };
