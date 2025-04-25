import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, CategoryController.create);
router.get('/', authMiddleware, CategoryController.getAllByTherapist);
router.get('/:id', authMiddleware, CategoryController.getById);
router.put('/:id', authMiddleware, CategoryController.update);
router.delete('/:id', authMiddleware, CategoryController.delete);

export default router;
