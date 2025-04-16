import express from 'express';
import { AnamneseController } from '../controllers/AnamneseController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, AnamneseController.create);

router.get('/', authMiddleware, AnamneseController.getAll);

router.get('/:id', authMiddleware, AnamneseController.getById);

router.put('/:id', authMiddleware, AnamneseController.update);

router.delete('/:id', authMiddleware, AnamneseController.delete);

export default router;
