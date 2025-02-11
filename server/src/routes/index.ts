import express from 'express';
import authenticateToken from '../middleware/auth';
import { getAllTickets as getTickets, createTicket } from '../controllers/ticketController';
import authRoutes from './auth-routes';

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/tickets', authenticateToken, getTickets);
router.post('/tickets', authenticateToken, createTicket);

export default router;