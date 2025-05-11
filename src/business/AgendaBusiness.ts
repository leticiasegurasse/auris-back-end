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
  // Cria uma nova agenda
  static async create(data: CreateAgendaDTO): Promise<IAgenda> {
    return AgendaService.createAgenda(data);
  }

  // Lista todas as agendas
  static async getAll(): Promise<IAgenda[]> {
    return AgendaService.getAllAgendas();
  }

  // Retorna uma agenda específica por ID
  static async getById(id: string): Promise<IAgenda> {
    const agenda = await AgendaService.getAgendaById(id);
    if (!agenda) throw new Error('Agenda not found');
    return agenda;
  }

  // Atualiza uma agenda existente
  static async update(id: string, data: Partial<IAgenda>): Promise<IAgenda> {
    const updated = await AgendaService.updateAgenda(id, data);
    if (!updated) throw new Error('Failed to update agenda');
    return updated;
  }

  // Remove uma agenda
  static async delete(id: string): Promise<IAgenda> {
    const deleted = await AgendaService.deleteAgenda(id);
    if (!deleted) throw new Error('Failed to delete agenda');
    return deleted;
  }

  // Retorna agendas por fonoaudiólogo
  static async getByTherapist(therapistId: string): Promise<IAgenda[]> {
    return AgendaService.getAgendasByTherapist(therapistId);
  }

  // Retorna agendas por paciente
  static async getByPatient(patientId: string): Promise<IAgenda[]> {
    return AgendaService.getAgendasByPatient(patientId);
  }
}
