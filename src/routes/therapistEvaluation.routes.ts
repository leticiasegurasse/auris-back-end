import express from 'express';
import { TherapistEvaluationController } from '../controllers/TherapistEvaluationController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, TherapistEvaluationController.create);
router.get('/', authMiddleware, TherapistEvaluationController.getAll);
router.get('/:id', authMiddleware, TherapistEvaluationController.getById);
router.put('/:id', authMiddleware, TherapistEvaluationController.update);

export default router;
