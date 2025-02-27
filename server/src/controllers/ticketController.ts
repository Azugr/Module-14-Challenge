import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';

// GET all tickets
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll(); 
    res.json(tickets);
  } catch (error: any) {
    console.error('❌ Error retrieving tickets:', error);
    res.status(500).json({ message: 'Failed to retrieve tickets' });
  }
};

// GET tickets by Id
export const getTicketById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id, {
      include: [
        {
          model: User,
          as: 'assignedUser', 
          attributes: ['username'], 
        },
      ],
    });
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE tickets
export const createTicket = async (req: Request, res: Response) => {
  const { name, status, description,  } = req.body;
  try {
    const newTicket = await Ticket.create({ name, status, description,  });
    res.status(201).json(newTicket);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE tickets
export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, description,  } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      ticket.name = name;
      ticket.status = status;
      ticket.description = description;
      await ticket.save();
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE tickets
export const deleteTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      await ticket.destroy();
      res.json({ message: 'Ticket deleted' });
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};