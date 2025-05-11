import express from 'express';
import { AgendaController } from '../controllers/AgendaController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = express.Router();

router.post('/', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.create);

router.get('/:id', authMiddleware, AgendaController.getById);

router.get('/', authMiddleware, AgendaController.getAll);

router.get('/patient/:patientId', authMiddleware, AgendaController.getByPatient);

router.put('/:id', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.update);

router.delete('/:id', authMiddleware, LoggingMiddleware('Agenda'), AgendaController.delete);

export default router;
