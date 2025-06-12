/**
 * Controlador que gerencia as operações relacionadas aos relatórios dos pacientes
 * Responsável por criar, buscar e atualizar relatórios de anamnese e evolução
 */
import { Request, Response } from 'express';
import { PatientReportBusiness } from '../business/PatientReportBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { CacheService } from '../services/cache.service';

export class PatientReportController {
  /**
   * Cria um novo relatório do paciente
   * @param req - Requisição contendo os dados do relatório (report, observation, patientId, type)
   * @param res - Resposta HTTP
   * @returns Relatório criado ou erro
   */
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { report, observation, patientId, type } = req.body;
      const userId = req.user?.id;

      if (!['anamnese', 'evolucao'].includes(type)) {
        throw new Error('Tipo de relatório inválido. Deve ser "anamnese" ou "evolucao"');
      }

      const created = await PatientReportBusiness.create({ report, observation, userId, patientId, type });
      
      // Limpa o cache após criar com sucesso
      await CacheService.getInstance().clear();
      
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca todos os relatórios de um usuário (terapeuta)
   * @param req - Requisição contendo o ID do usuário e parâmetros de paginação
   * @param res - Resposta HTTP
   * @returns Lista paginada de relatórios
   */
  static async getAllByUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      
      const result = await PatientReportBusiness.getAllByUser(userId, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca um relatório pelo seu ID
   * @param req - Requisição contendo o ID do relatório
   * @param res - Resposta HTTP
   * @returns Relatório encontrado ou erro
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await PatientReportBusiness.getById(id);
      res.json(report);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza um relatório existente
   * @param req - Requisição contendo o ID do relatório e novos dados
   * @param res - Resposta HTTP
   * @returns Relatório atualizado ou erro
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { report, observation, type } = req.body;

      if (type && !['anamnese', 'evolucao'].includes(type)) {
        throw new Error('Tipo de relatório inválido. Deve ser "anamnese" ou "evolucao"');
      }

      const updated = await PatientReportBusiness.update(id, { report, observation, type });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca todos os relatórios de um paciente específico
   * @param req - Requisição contendo o ID do paciente
   * @param res - Resposta HTTP
   * @returns Lista de relatórios do paciente
   */
  static async getByPatientId(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const reports = await PatientReportBusiness.getByPatientId(patientId);
      res.json(reports);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca estatísticas dos relatórios de um usuário
   * @param req - Requisição contendo o ID do usuário
   * @param res - Resposta HTTP
   * @returns Estatísticas dos relatórios (total, por tipo)
   */
  static async getReportsStats(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const stats = await PatientReportBusiness.getReportsStats(userId);
      res.json(stats);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca relatórios pelo nome do paciente
   * @param req - Requisição contendo o nome do paciente e parâmetros de paginação
   * @param res - Resposta HTTP
   * @returns Lista paginada de relatórios filtrados por nome
   */
  static async getByPatientName(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const { name } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      if (!name || typeof name !== 'string') {
        throw new Error('Nome do paciente é obrigatório');
      }

      const result = await PatientReportBusiness.getByPatientName(userId, name, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}