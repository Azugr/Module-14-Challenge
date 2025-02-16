import express from 'express';
import { seedUsers } from '../../seeds/userSeeds.js';
import { seedTickets } from '../../seeds/ticketSeeds.js';

const router = express.Router();

// Route to seed users
router.post('/seed-users', async (req, res) => {
  try {
    await seedUsers();
    res.status(200).json({ message: 'Users seeded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding users.', error: (error as Error).message });
  }
});

// Route to seed tickets
router.post('/seed-tickets', async (req, res) => {
  try {
    await seedTickets();
    res.status(200).json({ message: 'Tickets seeded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding tickets.', error: (error as Error).message });
  }
});

export default router;