import { sequelize } from '../models';
import { seedUsers } from './userSeeds.js';
import { ticketSeeds } from './ticketSeeds.js';

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("----- DATABASE SYNCED -----");

    await seedUsers();
    console.log("----- USERS SEEDED -----");

    await ticketSeeds();
    console.log("----- TICKETS SEEDED -----");

    process.exit(0);
  } catch (err) {
    console.error("🚨 Error seeding database:", err);
    process.exit(1);
  }
};

seedAll();