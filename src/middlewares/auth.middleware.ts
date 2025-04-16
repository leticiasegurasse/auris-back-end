import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../utils/auth/jwt.service';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

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
