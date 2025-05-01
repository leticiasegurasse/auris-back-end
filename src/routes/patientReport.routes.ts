import express from 'express';
import { PatientReportController } from '../controllers/PatientReportController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, PatientReportController.create);
router.get('/:id', authMiddleware, PatientReportController.getById);
router.get('/', authMiddleware, PatientReportController.getAllByUser);
router.put('/:id', authMiddleware, PatientReportController.update);
router.get('/patient/:patientId', authMiddleware, PatientReportController.getByPatientId);

export default router;
