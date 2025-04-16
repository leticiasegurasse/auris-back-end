import express from 'express';
import multer from 'multer';
import { PatientExerciseController } from '../controllers/PatientExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, PatientExerciseController.create);
router.get('/', authMiddleware, PatientExerciseController.getAllByPatient);
router.put('/:id', authMiddleware, PatientExerciseController.update);

router.put('/:id/review', authMiddleware, PatientExerciseController.updateReview);
router.get('/:id/review', authMiddleware, PatientExerciseController.getReview);

export default router;
