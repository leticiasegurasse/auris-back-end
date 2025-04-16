import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { PatientExerciseBusiness } from '../business/PatientExerciseBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientExerciseController {
    static async create(req: AuthenticatedRequest, res: Response) {
        try {
          const {
            patientId,
            exerciseId,
            status,
            patientComment,
            responseDate,
            startDate,
            endDate
          } = req.body;
      
          const data = {
            patientId,
            exerciseId,
            status,
            patientComment,
            responseDate,
            startDate,
            endDate
          };
      
          const created = await PatientExerciseBusiness.create(data);
          res.status(201).json(created);
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
    }
      

  static async getAllByPatient(req: AuthenticatedRequest, res: Response) {
    try {
      const patientId = req.user?.id;
      const result = await PatientExerciseBusiness.getAllByPatient(patientId);
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const response = result.map((item: any) => ({
        ...item.toObject(),
        audioUrl: `${baseUrl}/patient-exercises/audio/${item.audioResponse}`
      }));

      res.json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        status,
        patientComment,
        responseDate,
        startDate,
        endDate,
        therapistReview
      } = req.body;
  
      const updated = await PatientExerciseBusiness.update(id, {
        status,
        patientComment,
        responseDate,
        startDate,
        endDate,
        therapistReview
      });
  
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  

  static async updateReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { therapistComment, therapistFeedback, score } = req.body;
  
      const updated = await PatientExerciseBusiness.updateReview(id, {
        therapistComment,
        therapistFeedback,
        score
      });
  
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  static async getReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const review = await PatientExerciseBusiness.getReview(id);
      res.json(review);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
}
