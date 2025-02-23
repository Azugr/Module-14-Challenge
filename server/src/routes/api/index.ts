import { Router } from 'express';
import { ticketRoutes } from './ticketRoutes.js';
import { userRoutes } from './userRoutes.js';

const router = Router();

router.use('/tickets', ticketRoutes);
router.use('/users', userRoutes);

export default router;
