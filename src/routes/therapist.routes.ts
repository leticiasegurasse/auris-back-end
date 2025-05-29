import express from 'express';
import { TherapistController } from '../controllers/TherapistController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/:id', authMiddleware, TherapistController.getById);
router.get('/', TherapistController.getAll);
router.put('/:id', authMiddleware, TherapistController.update);
router.post('/:id/cancel-subscription', authMiddleware, TherapistController.cancelSubscription);

export default router;
