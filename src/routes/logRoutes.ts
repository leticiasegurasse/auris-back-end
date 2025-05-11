import { Router } from 'express';
import { LogController } from '../controllers/LogController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/logs', authMiddleware, LogController.getLogs);

export default router; 