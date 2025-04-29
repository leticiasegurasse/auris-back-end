import express from 'express';
import multer from 'multer';
import { PatientExerciseController } from '../controllers/PatientExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Rotas específicas
router.put('/:id/review', authMiddleware, PatientExerciseController.updateReview);
router.get('/:id/review', authMiddleware, PatientExerciseController.getReview);

// Depois as genéricas
router.post('/', authMiddleware, PatientExerciseController.create);
// Busca os exercicios do paciente logado
router.get('/', authMiddleware, PatientExerciseController.getAllByPatient);
router.put('/:id', authMiddleware, PatientExerciseController.update);

// Busca os exercícios pelo id do paciente
router.get('/patient/:patientId', authMiddleware, PatientExerciseController.getAllByPatientId);

// Rota para deletar exercício pendente
router.delete('/:id', authMiddleware, PatientExerciseController.deleteIfPending);

export default router;
