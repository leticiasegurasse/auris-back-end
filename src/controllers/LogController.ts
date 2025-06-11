/**
 * Controlador que gerencia as operações relacionadas aos logs do sistema
 * Responsável por buscar logs de ações realizadas no sistema
 */
import { Request, Response } from 'express';
import { LoggerService } from '../services/LoggerService';

export class LogController {
  /**
   * Busca logs do sistema com filtros opcionais
   * @param req - Requisição contendo filtros de entidade e ação nos query params
   * @param res - Resposta HTTP
   * @returns Lista de logs filtrados ou erro
   */
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