/**
 * Rotas de Relatórios do Paciente
 * Este arquivo contém as rotas para gerenciamento dos relatórios dos pacientes.
 * Todas as rotas requerem autenticação.
 */
import express, { RequestHandler } from 'express';
import { PatientReportController } from '../controllers/PatientReportController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = express.Router();

// Cria um novo relatório do paciente
router.post('/', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.create);

// Obtém quantidade de relatórios total e por tipo
router.get('/stats', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientReportController.getReportsStats);

// Busca relatórios pelo nome do paciente
router.get('/search', authMiddleware, PatientReportController.getByPatientName);

// Busca relatórios de um paciente específico pelo ID
router.get('/patient/:patientId', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientReportController.getByPatientId);

// Lista todos os relatórios do usuário logado
router.get('/', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientReportController.getAllByUser);

// Busca um relatório específico pelo ID
router.get('/:id', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientReportController.getById);

// Atualiza um relatório existente
router.put('/:id', authMiddleware, LoggingMiddleware('PatientReport'), PatientReportController.update);

export default router;
