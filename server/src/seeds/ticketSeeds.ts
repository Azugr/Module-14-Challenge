import { Ticket } from '../models/ticket.js';

export const ticketSeeds = async () => {

  await Ticket.destroy({ where: {} });

  await Ticket.bulkCreate([
    {
      name: 'Create Homepage Layout',
      status: 'In Progress',
      description: 'Develop initial sketches and design prototypes for the homepage.',
      assignedUserId: 1
    },
    {
      name: 'Configure Repository',
      status: 'Done',
      description: 'Establish a new GitHub repository and include an introductory README.',
      assignedUserId: 2
    },
    {
      name: 'Build Authentication System',
      status: 'Todo',
      description: 'Create a secure login mechanism using token-based authentication.',
      assignedUserId: 3
    },
    {
      name: 'Validate API Endpoints',
      status: 'Todo',
      description: 'Perform comprehensive testing on API endpoints to ensure reliability.',
      assignedUserId: 4
    },
    {
      name: 'Launch Application',
      status: 'Todo',
      description: 'Deploy the final version of the application to the production environment.',
      assignedUserId: 5
    }
  ]);
};
