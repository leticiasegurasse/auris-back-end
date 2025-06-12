/**
 * Rotas de Pacientes
 * Este arquivo contém as rotas para gerenciamento dos pacientes.
 * Todas as rotas requerem autenticação.
 */
import express, { RequestHandler } from 'express';
import { PatientController } from '../controllers/PatientController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = express.Router();

// Lista todos os pacientes do terapeuta logado
router.get('/', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientController.getAllByTherapist);

// Busca um paciente específico pelo ID
router.get('/:id', authMiddleware, PatientController.getById);

// Atualiza os dados de um paciente
router.put('/:id', authMiddleware, LoggingMiddleware('Patient'), PatientController.update);

export default router;