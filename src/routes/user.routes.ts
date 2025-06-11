/**
 * Rotas de Usuário
 * Este arquivo contém as rotas para gerenciamento de usuários do sistema.
 * Todas as rotas requerem autenticação.
 */
import express from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// Busca os dados de um usuário pelo seu ID
router.get('/:id', authMiddleware, UserController.getById);

// Atualiza os dados de um usuário
router.put('/:id', authMiddleware, UserController.update);

export default router;
