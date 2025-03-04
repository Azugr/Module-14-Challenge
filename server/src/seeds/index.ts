import { userSeeds } from './userSeeds';
import { ticketSeeds } from './ticketSeeds';
import { sequelize } from '../models/index';

// Function to seed all data
const seedAll = async (): Promise<void> => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Seed users
    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');
    
    // Seed tickets
    await ticketSeeds();
    console.log('\n----- TICKETS SEEDED -----\n');
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Execute the seed function
seedAll();