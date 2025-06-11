/**
 * Controlador que gerencia as operações de autenticação
 * Responsável por registrar novos usuários, fazer login e verificar tokens
 */
import { Request, Response } from 'express';
import { AuthBusiness } from '../business/AuthBusiness';
import { JwtService } from '../utils/auth/jwt.service';

export class AuthController {
  /**
   * Registra um novo usuário no sistema
   * @param req - Requisição contendo os dados do usuário (nome, email, senha, papel)
   * @param res - Resposta HTTP
   * @returns Usuário registrado ou erro
   */
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthBusiness.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Realiza o login de um usuário
   * @param req - Requisição contendo email e senha
   * @param res - Resposta HTTP
   * @returns Token JWT e dados do usuário ou erro
   * @throws Erro se as credenciais forem inválidas ou se a assinatura não estiver ativa
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
  
    try {
      const result = await AuthBusiness.login({ email, password });
  
      if ('error' in result && result.error) {
        return res.status(401).json({
          message: result.message,
          paymentLink: result.paymentLink // pode ser undefined se não for o caso de assinatura
        });
      }
  
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid email or password.') {
        return res.status(401).json({ message: 'Email ou senha inválidos' });
      }
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
  
  /**
   * Verifica se um token JWT é válido
   * @param req - Requisição contendo o token no header Authorization
   * @param res - Resposta HTTP
   * @returns Status de validade do token e dados do usuário ou erro
   */
  static async verifyToken(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ valid: false, message: 'Token não fornecido' });
      }

      const token = authHeader.split(' ')[1];
      const jwt = JwtService.getInstance();
      const decoded = await jwt.verify(token);

      if (!decoded) {
        return res.status(401).json({ valid: false, message: 'Token inválido ou expirado' });
      }

      res.status(200).json({ valid: true, message: 'Token válido', user: decoded });
    } catch (error: any) {
      res.status(401).json({ valid: false, message: 'Falha na autenticação' });
    }
  }
}
