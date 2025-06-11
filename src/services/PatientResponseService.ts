/**
 * Serviço que faz as operações diretas no banco de dados das respostas dos pacientes
 * É aqui que salvamos, buscamos e atualizamos as respostas dos pacientes
 */
import PatientResponse from '../models/PatientResponse';

export class PatientResponseService {
  /**
   * Cria uma nova resposta no banco de dados
   * @param data - Dados da resposta (comentário, data, áudio e ID do exercício)
   * @returns A resposta criada
   */
  static async create(data: any) {
    return PatientResponse.create(data);
  }

  /**
   * Busca uma resposta pelo seu ID
   * @param id - ID da resposta
   * @returns A resposta encontrada com os dados do exercício
   */
  static async getById(id: string) {
    return PatientResponse.findById(id).populate('patientExerciseId');
  }

  /**
   * Busca todas as respostas
   * @returns Lista com todas as respostas e seus exercícios
   */
  static async getAll() {
    return PatientResponse.find().populate('patientExerciseId');
  }

  /**
   * Atualiza uma resposta existente
   * @param id - ID da resposta
   * @param data - Novos dados da resposta
   * @returns A resposta atualizada
   */
  static async update(id: string, data: any) {
    return PatientResponse.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Busca respostas pelo ID do exercício do paciente
   * @param patientExerciseId - ID do exercício do paciente
   * @returns Lista com as respostas encontradas e seus exercícios
   */
  static async getByPatientExerciseId(patientExerciseId: string) {
    return PatientResponse.find({ patientExerciseId }).populate('patientExerciseId');
  }
}
