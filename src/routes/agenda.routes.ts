import express from 'express';
import { AgendaController } from '../controllers/AgendaController';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', authMiddleware, AgendaController.create);

router.get('/', authMiddleware, AgendaController.getAll);

router.get('/:id', authMiddleware, AgendaController.getById);

router.put('/:id', authMiddleware, AgendaController.update);

router.delete('/:id', authMiddleware, AgendaController.delete);

export default router;
