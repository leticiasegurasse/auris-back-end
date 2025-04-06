import { Request, Response } from 'express';
import { TherapistBusiness } from '../business/TherapistBusiness';

export class TherapistController {
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const therapist = await TherapistBusiness.getById(id);
      res.json(therapist);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedTherapist = await TherapistBusiness.update(id, updates);
      res.json(updatedTherapist);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
