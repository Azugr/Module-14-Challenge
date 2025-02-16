import { Ticket } from '../models/ticket.js';

export const seedTickets = async () => {
  await Ticket.bulkCreate([
    { title: 'Design landing page', status: 'in-progress', description: 'Create wireframes and mockups for the landing page.', assignedUserId: 1 },
    { title: 'Develop API', status: 'to-do', description: 'Develop the REST API for the application.', assignedUserId: 2 },
    { title: 'Set up database', status: 'done', description: 'Set up the PostgreSQL database for the application.', assignedUserId: 3 },
  ]);
};