import express from 'express';
import { PatientReportController } from '../controllers/PatientReportController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

router.post('/', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.create);
router.get('/:id', authMiddleware, PatientReportController.getById);
router.get('/', authMiddleware, PatientReportController.getAllByUser);
router.put('/:id', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.update);
router.get('/patient/:patientId', authMiddleware, PatientReportController.getByPatientId);

export default router;
