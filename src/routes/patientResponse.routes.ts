import express from 'express';
import multer from 'multer';
import { PatientResponseController } from '../controllers/PatientResponseController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('audio'), PatientResponseController.create);
router.get('/', authMiddleware, PatientResponseController.getAll);
router.get('/:id', authMiddleware, PatientResponseController.getById);
router.put('/:id', authMiddleware, upload.single('audio'), PatientResponseController.update);
router.get('/audio/:id', PatientResponseController.getAudio);
router.get('/exercise/:patientExerciseId', authMiddleware, PatientResponseController.getByPatientExerciseId);

export default router;
