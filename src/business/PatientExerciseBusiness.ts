import { PatientExerciseService } from '../services/PatientExerciseService';

export class PatientExerciseBusiness {
  static async create(data: any) {
    return PatientExerciseService.create(data);
  }

  static async getAllByPatient(patientId: string) {
    return PatientExerciseService.getAllByPatient(patientId);
  }

  static async getById(id: string) {
    return PatientExerciseService.getById(id);
  }

  static async update(id: string, data: any) {
    return PatientExerciseService.update(id, data);
  }

  static async updateReview(id: string, review: any) {
    return PatientExerciseService.updateReview(id, review);
  }
  
  static async getReview(id: string) {
    return PatientExerciseService.getReview(id);
  }
  
}
