/**
 * Rotas de Checkout
 * Este arquivo contém as rotas para processamento de pagamentos.
 */
import { Router, Request, Response } from 'express';
import { createCheckoutSession } from '../controllers/checkoutController';

const router = Router();

// Cria uma nova sessão de checkout para um usuário
router.post('/:userId/create-checkout', (req: Request, res: Response) => {
    createCheckoutSession(req, res);
});

export default router; 