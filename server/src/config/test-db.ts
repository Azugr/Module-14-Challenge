import { sequelize } from './connection.js';  

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await sequelize.close();
  }
})();
