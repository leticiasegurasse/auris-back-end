import { TherapistEvaluationService } from '../services/TherapistEvaluationService';

export class TherapistEvaluationBusiness {
  static async create(data: any) {
    return TherapistEvaluationService.create(data);
  }

  static async getAll() {
    return TherapistEvaluationService.getAll();
  }

  static async getById(id: string) {
    return TherapistEvaluationService.getById(id);
  }

  static async update(id: string, data: any) {
    return TherapistEvaluationService.update(id, data);
  }

}