import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticketController.js';

const router = express.Router();

// Get all tickets
router.get('/', getAllTickets);

// Get a ticket by id
router.get('/:id', getTicketById);

// Create a new ticket
router.post('/', createTicket);

// Update a ticket
router.put('/:id', updateTicket);

// Delete a ticket 
router.delete('/:id', deleteTicket);

export { router as ticketRoutes };