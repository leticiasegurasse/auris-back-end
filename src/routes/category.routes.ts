import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = Router();

router.post('/', authMiddleware, LoggingMiddleware('Category'), CategoryController.create);
router.get('/', authMiddleware, CategoryController.getAllByTherapist);
router.get('/:id', authMiddleware, CategoryController.getById);
router.put('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.update);
router.delete('/:id', authMiddleware, LoggingMiddleware('Category'), CategoryController.delete);

export default router;
