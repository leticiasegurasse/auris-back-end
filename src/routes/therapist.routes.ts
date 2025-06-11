/**
 * Rotas de Fonoaudiólogo
 * Este arquivo contém as rotas para gerenciamento dos fonoaudiólogos.
 */
import express from 'express';
import { TherapistController } from '../controllers/TherapistController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Busca um fonoaudiólogo específico pelo ID
router.get('/:id', authMiddleware, TherapistController.getById);

// Lista todos os fonoaudiólogos
router.get('/', authMiddleware, TherapistController.getAll);

// Atualiza os dados de um fonoaudiólogo
router.put('/:id', authMiddleware, TherapistController.update);

// Cancela a assinatura de um fonoaudiólogo
router.post('/:id/cancel-subscription', authMiddleware, TherapistController.cancelSubscription);

export default router;
