import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

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

export const createTicket = async (req: Request, res: Response) => {
    const { name, status, description, assignedUserId } = req.body;

    try {
        const newTicket = await Ticket.create({ name, status, description, assignedUserId });
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ error: 'Ticket creation failed' });
    }
};

export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status, description, assignedUserId } = req.body;

    try {
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        await ticket.update({ name, status, description, assignedUserId });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ error: 'Ticket update failed' });
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