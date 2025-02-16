import express from 'express';
import userRouter from './api/userRoutes.js';
import ticketRouter from './api/ticketRoutes.js';
import authRoutes from './api/authRoutes.js';
import seedRoutes from './api/seedRoutes.js'; 
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Add auth routes without authentication middleware
router.use('/auth', authRoutes);

// Apply authentication middleware only to /users routes
router.use('/users', authenticateToken, userRouter);

// No authentication middleware for /tickets routes
router.use('/tickets', ticketRouter);

// Add seed routes
router.use('/seeds', seedRoutes);

export default router;