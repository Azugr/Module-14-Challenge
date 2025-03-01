import { Router } from 'express';
import authRoutes from './authRoutes.js';  
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// ✅ Ensure authentication routes are properly set up
router.use('/auth', authRoutes);

// ✅ Protect API routes with authentication
router.use('/api', authenticateToken, apiRoutes);

export default router;
