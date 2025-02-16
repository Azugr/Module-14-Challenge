import { seedUsers } from './userSeeds.js';
import { seedTickets } from './ticketSeeds.js';
import { sequelize } from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    console.log('🔍 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Connected to database.');

    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedTickets();
    console.log('\n----- TICKETS SEEDED -----\n');

    console.log('🚀 Seeding complete!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
