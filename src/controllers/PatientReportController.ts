import { Request, Response } from 'express';
import { PatientReportBusiness } from '../business/PatientReportBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientReportController {
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { report, observation } = req.body;
      const userId = req.user?.id;

      const created = await PatientReportBusiness.create({ report, observation, userId });
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
      const { report, observation } = req.body;
      const updated = await PatientReportBusiness.update(id, { report, observation });
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

}