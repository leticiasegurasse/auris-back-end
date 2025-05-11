import { Request, Response } from 'express';
import { LoggerService } from '../services/LoggerService';

export class LogController {
  static async getLogs(req: Request, res: Response) {
    try {
      const { entity, action } = req.query;
      const logs = await LoggerService.getLogs(
        entity as string,
        action as 'CREATE' | 'UPDATE' | 'DELETE'
      );
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar logs' });
    }
  }
} 