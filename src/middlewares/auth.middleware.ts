/**
 * Middleware de autenticação
 * Responsável por verificar e validar tokens JWT nas requisições
 * Adiciona os dados do usuário decodificados à requisição
 */
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../utils/auth/jwt.service';

/**
 * Interface que estende a Request do Express para incluir os dados do usuário autenticado
 */
export interface AuthenticatedRequest extends Request {
  user?: any;
}

/**
 * Middleware que verifica a autenticação do usuário
 * @param req - Requisição HTTP com possíveis dados do usuário
 * @param res - Resposta HTTP
 * @param next - Função para continuar o fluxo da requisição
 * @returns Erro 401 se não houver token ou se o token for inválido
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const jwt = JwtService.getInstance();
    const decoded = await jwt.verify(token);

    if (!decoded) {
      res.status(401).json({ error: 'Invalid or expired token.' });
      return;
    }

    req.user = decoded;
    next(); // <-- continue para a próxima função
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed.' });
  }
};
