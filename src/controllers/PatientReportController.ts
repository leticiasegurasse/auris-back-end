import { Request, Response } from 'express';
import { PatientReportBusiness } from '../business/PatientReportBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientReportController {
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { report, observation, patientId, type } = req.body;
      const userId = req.user?.id;

      if (!['anamnese', 'evolucao'].includes(type)) {
        throw new Error('Tipo de relatório inválido. Deve ser "anamnese" ou "evolucao"');
      }

      const created = await PatientReportBusiness.create({ report, observation, userId, patientId, type });
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

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

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const report = await PatientReportBusiness.getById(id);
      res.json(report);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

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

  static async getByPatientId(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const reports = await PatientReportBusiness.getByPatientId(patientId);
      res.json(reports);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getReportsStats(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;
      const stats = await PatientReportBusiness.getReportsStats(userId);
      res.json(stats);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

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