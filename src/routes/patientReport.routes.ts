import express from 'express';
import { PatientReportController } from '../controllers/PatientReportController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

router.post('/', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.create);
router.get('/stats', authMiddleware, PatientReportController.getReportsStats);
router.get('/patient/:patientId', authMiddleware, PatientReportController.getByPatientId);
router.get('/', authMiddleware, PatientReportController.getAllByUser);
router.get('/:id', authMiddleware, PatientReportController.getById);
router.put('/:id', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.update);

export default router;
