import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';
import { User } from '../models/user.js';

// GET all tickets
export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await Ticket.findAll({
      include: [
        {
          model: User,
          as: 'assignedUser', 
          attributes: ['username'], 
        },
      ],
    });
    res.json(tickets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
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
  const { title, status, description, assignedUserId } = req.body;
  try {
    const newTicket = await Ticket.create({ title, status, description, assignedUserId });
    res.status(201).json(newTicket);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE tickets
export const updateTicket = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, status, description, assignedUserId } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    if (ticket) {
      ticket.title = title;
      ticket.status = status;
      ticket.description = description;
      ticket.assignedUserId = assignedUserId;
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