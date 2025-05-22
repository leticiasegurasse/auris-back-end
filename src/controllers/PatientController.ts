import { Request, Response } from 'express';
import { PatientBusiness } from '../business/PatientBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientController {
  static async getAllByTherapist(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const therapistId = req.user?.id;
      if (!therapistId) {
        res.status(401).json({ message: 'Therapist ID is missing in token.' });
        return;
      }

      const patients = await PatientBusiness.getAllByTherapist(therapistId);
      res.json(patients);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await PatientBusiness.getById(id);
      res.json(patient);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updated = await PatientBusiness.update(id, updates);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
