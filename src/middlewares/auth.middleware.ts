import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../utils/auth/jwt.service';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    [key: string]: any;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader) {
      res.status(401).json({ error: 'Access denied. No token provided.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    const jwt = JwtService.getInstance();
    const decoded = await jwt.verify(token);
    console.log('Decoded token:', decoded);

    if (!decoded) {
      res.status(401).json({ error: 'Invalid or expired token.' });
      return;
    }

    // Garante que o objeto user tenha a estrutura correta
    req.user = {
      id: (decoded as any).id,
      role: (decoded as any).role,
      ...decoded
    };

    console.log('User added to request:', req.user);
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Authentication failed.' });
  }
};
