import { Router } from 'express';
import { ticketRoutes } from './ticketRoutes';
import { userRoutes } from './userRoutes';

// Initialize the router
const router = Router();

// Use ticket routes for /tickets endpoint
router.use('/tickets', ticketRoutes);

// Use user routes for /users endpoint
router.use('/users', userRoutes);

// Export the router for use in other parts of the application
export default router;
