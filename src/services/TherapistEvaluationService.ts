import TherapistEvaluation from '../models/TherapistEvaluation';

export class TherapistEvaluationService {
  static async create(data: any) {
    return TherapistEvaluation.create(data);
  }

  static async getAll() {
    return TherapistEvaluation.find().populate('patientResponseId');
  }

  static async getById(id: string) {
    return TherapistEvaluation.findById(id).populate('patientResponseId');
  }

  static async update(id: string, data: any) {
    return TherapistEvaluation.findByIdAndUpdate(id, data, { new: true });
  }

}