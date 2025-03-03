import { Router } from 'express';
import authRoutes from './authRoutes';
import apiRoutes from './api/index';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use('/auth', authRoutes);

router.use('/api', authenticateToken, apiRoutes);

export default router;