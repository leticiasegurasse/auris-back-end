/**
 * Serviço que faz as operações diretas no banco de dados relacionadas à agenda de consultas
 * Responsável por criar, buscar, atualizar e excluir agendamentos no MongoDB
 */
import Agenda, { IAgenda } from '../models/Agenda';
import mongoose from 'mongoose';

interface CreateAgendaDTO {
  patient: string;
  therapist: string;
  consultationDateTime: Date;
  specialty?: string;
  observations?: string;
}

export class AgendaService {
  /**
   * Cria um novo agendamento no banco de dados
   * @param data - Dados do agendamento (paciente, terapeuta, data/hora, especialidade e observações)
   * @returns Agendamento criado
   */
  static async createAgenda(data: CreateAgendaDTO): Promise<IAgenda> {
    const patientId = new mongoose.Types.ObjectId(data.patient);
    const therapistId = new mongoose.Types.ObjectId(data.therapist);
    const parsedDate = new Date(data.consultationDateTime);
    
    return Agenda.create({
      patient: patientId,
      therapist: therapistId,
      consultationDateTime: parsedDate,
      specialty: data.specialty ?? 'Fonoaudiologia',
      observations: data.observations
    });
  }

  /**
   * Busca todos os agendamentos cadastrados
   * @returns Lista de todos os agendamentos com dados do paciente e terapeuta populados
   */
  static async getAllAgendas(): Promise<IAgenda[]> {
    return Agenda.find()
      .populate('patient')
      .populate('therapist');
  }

  /**
   * Busca todos os agendamentos de um fonoaudiólogo
   * @param therapistId - ID do fonoaudiólogo
   * @returns Lista de agendamentos com dados do paciente e terapeuta populados
   */
  static async getAgendasByTherapist(therapistId: string): Promise<IAgenda[]> {
    return Agenda.find({ therapist: therapistId })
      .populate({
        path: 'patient',
        populate: {
          path: 'userId',
          model: 'User'
        }
      })
      .populate('therapist');
  }

  /**
   * Busca todos os agendamentos de um paciente
   * @param patientId - ID do paciente
   * @returns Lista de agendamentos com dados do paciente e terapeuta populados
   */
  static async getAgendasByPatient(patientId: string): Promise<IAgenda[]> {
    return Agenda.find({ patient: patientId })
      .populate('patient')
      .populate('therapist');
  }

  /**
   * Busca um agendamento pelo seu ID
   * @param id - ID do agendamento
   * @returns Agendamento encontrado com dados do paciente e terapeuta populados
   */
  static async getAgendaById(id: string): Promise<IAgenda | null> {
    return Agenda.findById(id)
      .populate('patient')
      .populate('therapist');
  }

  /**
   * Atualiza um agendamento existente
   * @param id - ID do agendamento
   * @param updates - Novos dados do agendamento
   * @returns Agendamento atualizado
   */
  static async updateAgenda(id: string, updates: Partial<IAgenda>): Promise<IAgenda | null> {
    updates.updated_at = new Date();
    return Agenda.findByIdAndUpdate(id, updates, { new: true });
  }

  /**
   * Exclui um agendamento
   * @param id - ID do agendamento
   * @returns Agendamento excluído
   */
  static async deleteAgenda(id: string): Promise<IAgenda | null> {
    return Agenda.findByIdAndDelete(id);
  }

  /**
   * Busca todas as consultas futuras de um fonoaudiólogo
   * @param therapistId - ID do fonoaudiólogo
   * @returns Lista de consultas futuras ordenadas por data/hora
   */
  static async getFutureConsultations(therapistId: string): Promise<IAgenda[]> {
    const now = new Date();
    return Agenda.find({ 
      consultationDateTime: { $gte: now },
      therapist: therapistId
    })
      .populate({
        path: 'patient',
        populate: {
          path: 'userId',
          model: 'User'
        }
      })
      .populate('therapist')
      .sort({ consultationDateTime: 1 });
  }
}
