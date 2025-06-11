/**
 * Classe que cuida das regras de negócio das respostas dos pacientes
 * É aqui que verificamos se tudo está correto antes de criar ou atualizar uma resposta
 */
import { PatientResponseService } from '../services/PatientResponseService';
import { PatientExerciseService } from '../services/PatientExerciseService';

export class PatientResponseBusiness {
  /**
   * Cria uma nova resposta do paciente
   * @param data - Dados da resposta (comentário, data e ID do exercício)
   * @returns A resposta criada
   * @throws Erro se houver algum problema ao criar a resposta
   */
  static async create(data: any) {
    try {
      // Cria a resposta do paciente
      const patientResponse = await PatientResponseService.create(data);

      // Atualiza o status do exercício para aguardando avaliação
      await PatientExerciseService.update(data.patientExerciseId.toString(), {
        status: 'waiting'
      });

      return patientResponse;
    } catch (error: any) {
      console.error('Erro ao criar resposta do paciente:', error);
      throw error;
    }
  }

  /**
   * Busca todas as respostas
   * @returns Lista com todas as respostas
   */
  static async getAll() {
    return PatientResponseService.getAll();
  }

  /**
   * Busca uma resposta pelo seu ID
   * @param id - ID da resposta
   * @returns A resposta encontrada
   */
  static async getById(id: string) {
    return PatientResponseService.getById(id);
  }

  /**
   * Atualiza uma resposta existente
   * @param id - ID da resposta
   * @param data - Novos dados da resposta
   * @returns A resposta atualizada
   */
  static async update(id: string, data: any) {
    return PatientResponseService.update(id, data);
  }

  /**
   * Busca respostas pelo ID do exercício do paciente
   * @param patientExerciseId - ID do exercício do paciente
   * @returns Lista com as respostas encontradas
   */
  static async getByPatientExerciseId(patientExerciseId: string) {
    return PatientResponseService.getByPatientExerciseId(patientExerciseId);
  }
}
