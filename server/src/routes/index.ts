import { Router } from 'express';
import authRoutes from './authRoutes';
import apiRoutes from './api/index';
import { authenticateToken } from '../middleware/auth';

// Initialize the router
const router = Router();

// Use auth routes for /auth endpoint
router.use('/auth', authRoutes);

// Use API routes for /api endpoint with token authentication
router.use('/api', authenticateToken, apiRoutes);

// Export the router for use in other parts of the application
export default router;