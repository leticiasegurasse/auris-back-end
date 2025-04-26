import express from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/:id', authMiddleware, UserController.getById);
router.put('/:id', authMiddleware, UserController.update);

export default router;
