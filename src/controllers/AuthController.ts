import { Request, Response } from 'express';
import { AuthBusiness } from '../business/AuthBusiness';
import { JwtService } from '../utils/auth/jwt.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const result = await AuthBusiness.register(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const result = await AuthBusiness.login({ email, password });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

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
