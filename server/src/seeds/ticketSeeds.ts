import { Ticket } from '../models/ticket.js';

export const ticketSeeds = async () => {
  await Ticket.bulkCreate([
    {
      name: 'Create Homepage Layout',
      status: 'in-progress',
      description: 'Develop initial sketches and design prototypes for the homepage.',
      assignedUserId: 1,
    },
    {
      name: 'Configure Repository',
      status: 'completed',
      description: 'Establish a new GitHub repository and include an introductory README.',
      assignedUserId: 2,
    },
    {
      name: 'Build Authentication System',
      status: 'to-do',
      description: 'Create a secure login mechanism using token-based authentication.',
      assignedUserId: 1,
    },
    {
      name: 'Validate API Endpoints',
      status: 'to-do',
      description: 'Perform comprehensive testing on API endpoints to ensure reliability.',
      assignedUserId: 1,
    },
    {
      name: 'Launch Application',
      status: 'to-do',
      description: 'Deploy the final version of the application to the production environment.',
      assignedUserId: 2,
    },
  ]);
};