/**
 * Rotas de Logs
 * Este arquivo contém as rotas para visualização dos logs do sistema.
 * Todas as rotas requerem autenticação.
 */
import { Router } from 'express';
import { LogController } from '../controllers/LogController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Lista todos os logs do sistema
router.get('/logs', authMiddleware, LogController.getLogs);

export default router; 