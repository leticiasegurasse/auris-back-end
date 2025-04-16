import PatientResponse from '../models/PatientResponse';

export class PatientResponseService {
  static async create(data: any) {
    return PatientResponse.create(data);
  }

  static async getById(id: string) {
    return PatientResponse.findById(id).populate('patientExerciseId');
  }

  static async getAll() {
    return PatientResponse.find().populate('patientExerciseId');
  }

  static async update(id: string, data: any) {
    return PatientResponse.findByIdAndUpdate(id, data, { new: true });
  }

}
