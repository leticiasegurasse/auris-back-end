/**
 * Classe que implementa as regras de negócio relacionadas aos pacientes
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { PatientService } from '../services/PatientService';
import { IPatient } from '../models/Patient';

export class PatientBusiness {
  /**
   * Busca todos os pacientes de um terapeuta com paginação
   * @param therapistId - ID do terapeuta
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Lista paginada de pacientes
   */
  static async getAllByTherapist(therapistId: string, page: number = 1, limit: number = 5) {
    return PatientService.getPatientsByTherapist(therapistId, page, limit);
  }

  /**
   * Busca um paciente pelo seu ID
   * @param id - ID do paciente
   * @returns Paciente encontrado
   * @throws Erro se o paciente não for encontrado
   */
  static async getById(id: string): Promise<IPatient> {
    const patient = await PatientService.getPatientById(id);
    if (!patient) throw new Error('Patient not found');
    return patient;
  }

  /**
   * Atualiza os dados de um paciente
   * @param id - ID do paciente
   * @param data - Dados a serem atualizados
   * @returns Paciente atualizado
   * @throws Erro se a atualização falhar
   */
  static async update(id: string, data: Partial<IPatient>): Promise<IPatient> {
    const updated = await PatientService.updatePatient(id, data);
    if (!updated) throw new Error('Failed to update patient');
    return updated;
  }
}