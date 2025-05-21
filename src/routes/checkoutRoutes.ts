import { Router, Request, Response } from 'express';
import { createCheckoutSession } from '../controllers/checkoutController';

const router = Router();

router.post('/:userId/create-checkout', (req: Request, res: Response) => {
    createCheckoutSession(req, res);
});

export default router; 