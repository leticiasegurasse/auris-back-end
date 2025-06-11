/**
 * Rotas de Categorias
 * Este arquivo contém as rotas para gerenciamento das categorias de exercícios.
 * Todas as rotas requerem autenticação.
 */
import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = Router();

// Cria uma nova categoria
router.post('/', authMiddleware, LoggingMiddleware('Category'), CategoryController.create);

// Lista todas as categorias do terapeuta logado
router.get('/', authMiddleware, CategoryController.getAllByTherapist);

// Busca uma categoria específica pelo ID
router.get('/:id', authMiddleware, CategoryController.getById);

// Atualiza uma categoria existente
router.put('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.update);

// Remove uma categoria
router.delete('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.delete);

export default router;
