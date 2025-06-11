/**
 * Rotas de Faturas
 * Este arquivo contém as rotas para visualização das faturas do sistema.
 * Todas as rotas requerem autenticação.
 */
import { Router } from 'express';
import { InvoiceController } from '../controllers/invoice.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Lista todas as faturas do usuário
router.get('/', authMiddleware, InvoiceController.getInvoices);

export default router; 