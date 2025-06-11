/**
 * Classe que implementa as regras de negócio relacionadas aos exercícios dos pacientes
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { PatientExerciseService } from '../services/PatientExerciseService';

export class PatientExerciseBusiness {
  /**
   * Cria um novo exercício para um paciente
   * @param data - Dados do exercício (patientId, exerciseId, status, etc)
   * @returns Exercício criado
   */
  static async create(data: any) {
    return PatientExerciseService.create(data);
  }

  /**
   * Busca todos os exercícios de um paciente
   * @param patientId - ID do paciente
   * @returns Lista de exercícios do paciente
   */
  static async getAllByPatient(patientId: string) {
    return PatientExerciseService.getAllByPatient(patientId);
  }

  /**
   * Busca um exercício pelo seu ID
   * @param id - ID do exercício
   * @returns Exercício encontrado
   */
  static async getById(id: string) {
    return PatientExerciseService.getById(id);
  }

  /**
   * Atualiza um exercício existente
   * @param id - ID do exercício
   * @param data - Novos dados do exercício
   * @returns Exercício atualizado
   */
  static async update(id: string, data: any) {
    return PatientExerciseService.update(id, data);
  }

  /**
   * Exclui um exercício pendente
   * @param id - ID do exercício
   * @returns Mensagem de sucesso ou erro
   * @throws Erro se o exercício não for encontrado ou não estiver pendente
   */
  static async deleteIfPending(id: string) {
    return PatientExerciseService.deleteIfPending(id);
  }
}
