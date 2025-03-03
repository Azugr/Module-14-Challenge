import { Router } from 'express';
import { ticketRoutes } from './ticketRoutes';
import { userRoutes } from './userRoutes';

const router = Router();

router.use('/tickets', ticketRoutes);
router.use('/users', userRoutes);

export default router;
