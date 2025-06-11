/**
 * Rotas de Autenticação
 * Este arquivo contém as rotas relacionadas à autenticação de usuários,
 * incluindo registro, login e verificação de token.
 */
import express, { RequestHandler } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

// Registra um novo usuário no sistema
router.post('/register', AuthController.register as RequestHandler);

// Realiza o login do usuário
router.post('/login', AuthController.login as RequestHandler);

// Verifica se um token de autenticação é válido
router.get('/verify-token', AuthController.verifyToken as RequestHandler);

export default router;