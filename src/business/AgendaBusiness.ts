/**
 * Classe que implementa as regras de negócio relacionadas à agenda de consultas
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { AgendaService } from '../services/AgendaService';
import { IAgenda } from '../models/Agenda';
import mongoose from 'mongoose';

interface CreateAgendaDTO {
  patient: string;
  therapist: string;
  consultationDateTime: Date;
  specialty?: string;
  observations?: string;
}

export class AgendaBusiness {
  /**
   * Cria um novo agendamento
   * @param data - Dados do agendamento (paciente, terapeuta, data/hora, especialidade e observações)
   * @returns Agendamento criado
   */
  static async create(data: CreateAgendaDTO): Promise<IAgenda> {
    return AgendaService.createAgenda(data);
  }

  /**
   * Lista todos os agendamentos
   * @returns Lista de todos os agendamentos
   */
  static async getAll(): Promise<IAgenda[]> {
    return AgendaService.getAllAgendas();
  }

  /**
   * Busca um agendamento pelo ID
   * @param id - ID do agendamento
   * @returns Agendamento encontrado
   * @throws Erro se o agendamento não for encontrado
   */
  static async getById(id: string): Promise<IAgenda> {
    const agenda = await AgendaService.getAgendaById(id);
    if (!agenda) throw new Error('Agenda not found');
    return agenda;
  }

  /**
   * Atualiza um agendamento existente
   * @param id - ID do agendamento
   * @param data - Novos dados do agendamento
   * @returns Agendamento atualizado
   * @throws Erro se não conseguir atualizar
   */
  static async update(id: string, data: Partial<IAgenda>): Promise<IAgenda> {
    const updated = await AgendaService.updateAgenda(id, data);
    if (!updated) throw new Error('Failed to update agenda');
    return updated;
  }

  /**
   * Remove um agendamento
   * @param id - ID do agendamento
   * @returns Agendamento removido
   * @throws Erro se não conseguir remover
   */
  static async delete(id: string): Promise<IAgenda> {
    const deleted = await AgendaService.deleteAgenda(id);
    if (!deleted) throw new Error('Failed to delete agenda');
    return deleted;
  }

  /**
   * Retorna todos os agendamentos de um fonoaudiólogo
   * @param therapistId - ID do fonoaudiólogo
   * @returns Lista de agendamentos do fonoaudiólogo
   */
  static async getByTherapist(therapistId: string): Promise<IAgenda[]> {
    return AgendaService.getAgendasByTherapist(therapistId);
  }

  /**
   * Retorna todos os agendamentos de um paciente
   * @param patientId - ID do paciente
   * @returns Lista de agendamentos do paciente
   */
  static async getByPatient(patientId: string): Promise<IAgenda[]> {
    return AgendaService.getAgendasByPatient(patientId);
  }

  /**
   * Retorna todas as consultas futuras de um fonoaudiólogo
   * @param therapistId - ID do fonoaudiólogo
   * @returns Lista de consultas futuras ordenadas por data/hora
   */
  static async getFutureConsultations(therapistId: string): Promise<IAgenda[]> {
    return AgendaService.getFutureConsultations(therapistId);
  }
}
