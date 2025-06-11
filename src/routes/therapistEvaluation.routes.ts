/**
 * Rotas de Avaliação do Terapeuta
 * Este arquivo contém as rotas para gerenciamento das avaliações feitas pelos terapeutas.
 * Todas as rotas requerem autenticação.
 */
import express from 'express';
import { TherapistEvaluationController } from '../controllers/TherapistEvaluationController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

// Cria uma nova avaliação do terapeuta
router.post('/', authMiddleware, LoggingMiddleware('TherapistEvaluation'), TherapistEvaluationController.create);

// Lista todas as avaliações
router.get('/', authMiddleware, TherapistEvaluationController.getAll);

// Busca uma avaliação específica pelo ID
router.get('/:id', authMiddleware, TherapistEvaluationController.getById);

// Atualiza uma avaliação existente
router.put('/:id', authMiddleware, LoggingMiddleware('TherapistEvaluation'), TherapistEvaluationController.update);

// Busca avaliações relacionadas a uma resposta específica do paciente
router.get('/patient-response/:patientResponseId', authMiddleware, TherapistEvaluationController.getByPatientResponseId);

export default router;
