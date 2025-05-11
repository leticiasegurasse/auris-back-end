import express from 'express';
import { TherapistEvaluationController } from '../controllers/TherapistEvaluationController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

router.post('/', authMiddleware, LoggingMiddleware('TherapistEvaluation'), TherapistEvaluationController.create);
router.get('/', authMiddleware, TherapistEvaluationController.getAll);
router.get('/:id', authMiddleware, TherapistEvaluationController.getById);
router.put('/:id', authMiddleware, LoggingMiddleware('TherapistEvaluation'), TherapistEvaluationController.update);

export default router;
