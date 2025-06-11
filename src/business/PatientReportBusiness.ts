/**
 * Classe que implementa as regras de negócio relacionadas aos relatórios dos pacientes
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { PatientReportService } from '../services/PatientReportService';

export class PatientReportBusiness {
  /**
   * Cria um novo relatório do paciente
   * @param data - Dados do relatório (report, observation, userId, patientId, type)
   * @returns Relatório criado
   */
  static async create(data: any) {
    return PatientReportService.create(data);
  }

  /**
   * Busca todos os relatórios de um usuário (terapeuta)
   * @param userId - ID do usuário (terapeuta)
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Lista paginada de relatórios
   */
  static async getAllByUser(userId: string, page: number = 1, limit: number = 5) {
    return PatientReportService.getAllByUser(userId, page, limit);
  }

  /**
   * Busca um relatório pelo seu ID
   * @param id - ID do relatório
   * @returns Relatório encontrado
   */
  static async getById(id: string) {
    return PatientReportService.getById(id);
  }

  /**
   * Atualiza um relatório existente
   * @param id - ID do relatório
   * @param data - Novos dados do relatório
   * @returns Relatório atualizado
   */
  static async update(id: string, data: any) {
    return PatientReportService.update(id, data);
  }

  /**
   * Busca todos os relatórios de um paciente específico
   * @param patientId - ID do paciente
   * @returns Lista de relatórios do paciente
   */
  static async getByPatientId(patientId: string) {
    return PatientReportService.getByPatientId(patientId);
  }

  /**
   * Busca estatísticas dos relatórios de um usuário
   * @param userId - ID do usuário (terapeuta)
   * @returns Estatísticas dos relatórios (total, por tipo)
   */
  static async getReportsStats(userId: string) {
    return PatientReportService.getReportsStats(userId);
  }

  /**
   * Busca relatórios pelo nome do paciente
   * @param userId - ID do usuário (terapeuta)
   * @param patientName - Nome do paciente para busca
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Lista paginada de relatórios filtrados por nome
   */
  static async getByPatientName(userId: string, patientName: string, page: number = 1, limit: number = 5) {
    return PatientReportService.getByPatientName(userId, patientName, page, limit);
  }
}