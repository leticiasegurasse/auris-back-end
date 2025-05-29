import express from 'express';
import { PatientController } from '../controllers/PatientController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

router.get('/', authMiddleware, PatientController.getAllByTherapist);
router.get('/:id', authMiddleware, PatientController.getById);
router.put('/:id', authMiddleware, LoggingMiddleware('Patient'), PatientController.update);

export default router;