/**
 * Serviço que faz as operações diretas no banco de dados das avaliações
 * É aqui que salvamos, buscamos e atualizamos as avaliações dos fonoaudiólogos
 */
import TherapistEvaluation from '../models/TherapistEvaluation';

export class TherapistEvaluationService {
  /**
   * Cria uma nova avaliação no banco de dados
   * @param data - Dados da avaliação (comentário, feedback, pontuação e ID da resposta)
   * @returns A avaliação criada
   */
  static async create(data: any) {
    return TherapistEvaluation.create(data);
  }

  /**
   * Busca todas as avaliações no banco de dados
   * @returns Lista com todas as avaliações, incluindo os dados da resposta do paciente
   */
  static async getAll() {
    return TherapistEvaluation.find().populate('patientResponseId');
  }

  /**
   * Busca uma avaliação pelo seu ID
   * @param id - ID da avaliação
   * @returns A avaliação encontrada, incluindo os dados da resposta do paciente
   */
  static async getById(id: string) {
    return TherapistEvaluation.findById(id).populate('patientResponseId');
  }

  /**
   * Atualiza uma avaliação existente
   * @param id - ID da avaliação
   * @param data - Novos dados da avaliação
   * @returns A avaliação atualizada
   */
  static async update(id: string, data: any) {
    return TherapistEvaluation.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Busca uma avaliação pelo ID da resposta do paciente
   * @param patientResponseId - ID da resposta do paciente
   * @returns A avaliação encontrada, incluindo os dados da resposta do paciente
   */
  static async getByPatientResponseId(patientResponseId: string) {
    return TherapistEvaluation.findOne({ patientResponseId }).populate('patientResponseId');
  }
}