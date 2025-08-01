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
      const reports = await PatientReportBusiness.getAllByUser(userId);
      res.json(reports);
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
}