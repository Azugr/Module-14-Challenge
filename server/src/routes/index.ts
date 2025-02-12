import express from 'express';
import authenticateToken from '../middleware/auth.js';
import { getAllTickets as getTickets, createTicket } from '../controllers/ticketController.js';
import authRoutes from './auth-routes.js';
import ticketRouter from './api/ticketRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/tickets', authenticateToken, getTickets);
router.post('/tickets', authenticateToken, createTicket);

export default router;