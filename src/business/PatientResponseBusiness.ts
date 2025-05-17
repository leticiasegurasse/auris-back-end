import { PatientResponseService } from '../services/PatientResponseService';
import { PatientExerciseService } from '../services/PatientExerciseService';

export class PatientResponseBusiness {
  static async create(data: any) {
    try {
      // Criar a resposta do paciente
      const patientResponse = await PatientResponseService.create(data);

      // Atualizar o status do PatientExercise para waiting
      await PatientExerciseService.update(data.patientExerciseId.toString(), {
        status: 'waiting'
      });

      return patientResponse;
    } catch (error: any) {
      console.error('Erro ao criar resposta do paciente:', error);
      throw error;
    }
  }

  static async getAll() {
    return PatientResponseService.getAll();
  }

  static async getById(id: string) {
    return PatientResponseService.getById(id);
  }

  static async update(id: string, data: any) {
    return PatientResponseService.update(id, data);
  }

  static async getByPatientExerciseId(patientExerciseId: string) {
    return PatientResponseService.getByPatientExerciseId(patientExerciseId);
  }
}
