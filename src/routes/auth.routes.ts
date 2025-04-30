import express, { RequestHandler } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.post('/register', AuthController.register as RequestHandler);
router.post('/login', AuthController.login as RequestHandler);
router.get('/verify-token', AuthController.verifyToken as RequestHandler);

export default router;