import { Request, Response } from 'express';
import { Ticket } from '../models/ticket.js';

export const getAllTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await Ticket.findAll();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tickets' });
    }
};

export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticket' });
    }
};

export const createTicket = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { title, status, description, assignedUserId } = req.body;
  
      const newTicket = await Ticket.create({ title, status, description, assignedUserId });
  
      return res.status(201).json(newTicket);
    } catch (error) {
      console.error('❌ Ticket creation error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };

// Update an existing ticket
export const updateTicket = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { title, status, description, assignedUserId } = req.body;
  
      const ticket = await Ticket.findByPk(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      await ticket.update({ title, status, description, assignedUserId });
  
      return res.status(200).json(ticket);
    } catch (error) {
      console.error('❌ Ticket update error:', error);
      return res.status(500).json({
        message: 'Server error',
        error: (error as Error).message,
      });
    }
  };

export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await ticket.destroy();
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Ticket deletion failed' });
    }
};