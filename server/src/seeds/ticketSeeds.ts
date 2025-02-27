import { Ticket } from '../models/ticket.js';

export const ticketSeeds = async () => {
  await Ticket.bulkCreate([
    {
      id: 1, 
      name: 'Create Homepage Layout',
      status: 'In Progress', 
      description: 'Develop initial sketches and design prototypes for the homepage.'
    },
    {
      id: 2,
      name: 'Configure Repository',
      status: 'Done', 
      description: 'Establish a new GitHub repository and include an introductory README.'
    },
    {
      id: 3,
      name: 'Build Authentication System',
      status: 'Todo',
      description: 'Create a secure login mechanism using token-based authentication.'
    },
    {
      id: 4,
      name: 'Validate API Endpoints',
      status: 'Todo',
      description: 'Perform comprehensive testing on API endpoints to ensure reliability.'
    },
    {
      id: 5,
      name: 'Launch Application',
      status: 'Todo',
      description: 'Deploy the final version of the application to the production environment.'
    }
  ], {
    ignoreDuplicates: true 
  });
};
