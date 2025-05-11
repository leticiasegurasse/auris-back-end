import express from 'express';
import multer from 'multer';
import { PatientExerciseController } from '../controllers/PatientExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rotas específicas
router.put('/:id/review', authMiddleware, LoggingMiddleware('PatientExerciseReview'), PatientExerciseController.updateReview);
router.get('/:id/review', authMiddleware, PatientExerciseController.getReview);

// Depois as genéricas
router.post('/', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.create);
// Busca os exercicios do paciente logado
router.get('/', authMiddleware, PatientExerciseController.getAllByPatient);
router.put('/:id', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.update);

// Busca os exercícios pelo id do paciente
router.get('/patient/:patientId', authMiddleware, PatientExerciseController.getAllByPatientId);

// Rota para deletar exercício pendente
router.delete('/:id', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.deleteIfPending);

export default router;
