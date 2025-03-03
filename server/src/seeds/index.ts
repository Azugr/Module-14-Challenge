import { userSeeds } from './userSeeds';
import { ticketSeeds } from './ticketSeeds';
import { sequelize } from '../models/index';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');
    
    await ticketSeeds();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();