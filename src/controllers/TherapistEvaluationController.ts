import { Request, Response } from 'express';
import { TherapistEvaluationBusiness } from '../business/TherapistEvaluationBusiness';

export class TherapistEvaluationController {
  static async create(req: Request, res: Response) {
    try {
      const { patientResponseId, therapistComment, therapistFeedback, score } = req.body;

      const evaluation = await TherapistEvaluationBusiness.create({
        patientResponseId,
        therapistComment,
        therapistFeedback,
        score
      });

      res.status(201).json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const evaluations = await TherapistEvaluationBusiness.getAll();
      res.json(evaluations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const evaluation = await TherapistEvaluationBusiness.getById(id);
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { therapistComment, therapistFeedback, score } = req.body;

      const updated = await TherapistEvaluationBusiness.update(id, {
        therapistComment,
        therapistFeedback,
        score
      });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getByPatientResponseId(req: Request, res: Response) {
    try {
      const { patientResponseId } = req.params;
      const evaluation = await TherapistEvaluationBusiness.getByPatientResponseId(patientResponseId);
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}