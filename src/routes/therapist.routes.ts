import express from 'express';
import { TherapistController } from '../controllers/TherapistController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/:id', authMiddleware, TherapistController.getById);
router.put('/:id', authMiddleware, TherapistController.update);

export default router;
