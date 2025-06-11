/**
 * Rotas de Exercícios do Paciente
 * Este arquivo contém as rotas para gerenciamento dos exercícios atribuídos aos pacientes.
 * Todas as rotas requerem autenticação.
 */
import express from 'express';
import multer from 'multer';
import { PatientExerciseController } from '../controllers/PatientExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();


// Atribui um novo exercício ao paciente
router.post('/', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.create);

// Lista todos os exercícios do paciente logado
router.get('/', authMiddleware, PatientExerciseController.getAllByPatient);

// Atualiza um exercício existente
router.put('/:id', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.update);

// Lista todos os exercícios de um paciente específico
router.get('/patient/:patientId', authMiddleware, PatientExerciseController.getAllByPatientId);

// Remove um exercício pendente
router.delete('/:id', authMiddleware, LoggingMiddleware('PatientExercise'), PatientExerciseController.deleteIfPending);

export default router;
