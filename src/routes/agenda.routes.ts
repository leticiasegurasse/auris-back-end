/**
 * Rotas da Agenda
 * Este arquivo contém as rotas para gerenciamento da agenda de consultas.
 * Todas as rotas requerem autenticação e algumas operações são registradas em log.
 */
import express, { RequestHandler } from 'express';
import { AgendaController } from '../controllers/AgendaController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = express.Router();

// Obtém todas as consultas futuras
router.get('/future', authMiddleware, cacheMiddleware(300) as RequestHandler, AgendaController.getFutureConsultations);

// Cria uma nova consulta na agenda
router.post('/', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.create);

// Obtém uma consulta específica pelo ID
router.get('/:id', authMiddleware, AgendaController.getById);

// Lista todas as consultas
router.get('/', authMiddleware, cacheMiddleware(300) as RequestHandler, AgendaController.getAll);

// Obtém todas as consultas de um paciente específico
router.get('/patient/:patientId', authMiddleware, AgendaController.getByPatient);

// Atualiza uma consulta existente
router.put('/:id', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.update);

// Remove uma consulta da agenda
router.delete('/:id', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.delete);

export default router;
