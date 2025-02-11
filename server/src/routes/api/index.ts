import express from 'express';
import userRouter from './userRoutes';
import ticketRouter from './ticketRoutes';
import authenticateToken from '../../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware only to /users routes
router.use('/users', authenticateToken, userRouter);

// No authentication middleware for /tickets routes
router.use('/tickets', ticketRouter);

export default router;