import express from 'express';
import { PatientReportController } from '../controllers/PatientReportController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, PatientReportController.create);
router.get('/', authMiddleware, PatientReportController.getAllByUser);
router.get('/:id', authMiddleware, PatientReportController.getById);
router.put('/:id', authMiddleware, PatientReportController.update);

export default router;
