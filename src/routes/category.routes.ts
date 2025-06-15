/**
 * Rotas de Categorias
 * Este arquivo contém as rotas para gerenciamento das categorias de exercícios.
 * Todas as rotas requerem autenticação.
 */
import { Router, RequestHandler } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = Router();

// Cria uma nova categoria
router.post('/', authMiddleware, LoggingMiddleware('Category'), CategoryController.create);

// Lista todas as categorias do terapeuta logado
router.get('/', authMiddleware, cacheMiddleware(300) as RequestHandler, CategoryController.getAllByTherapist);

// Busca uma categoria específica pelo ID
router.get('/:id', authMiddleware, CategoryController.getById);

// Atualiza uma categoria existente
router.put('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.update);

// Remove uma categoria
router.delete('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.delete);

// Conta exercícios por categoria do terapeuta logado
router.get('/stats/exercises', authMiddleware, cacheMiddleware(300) as RequestHandler, CategoryController.countExercisesByCategory);

export default router;
