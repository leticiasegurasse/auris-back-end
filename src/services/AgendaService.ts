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
  // Cria uma nova agenda a partir dos dados informados
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

  // Busca todas as agendas cadastradas
  static async getAllAgendas(): Promise<IAgenda[]> {
    return Agenda.find()
      .populate('patient')
      .populate('therapist');
  }

  // Busca agendas por fonoaudiólogo
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

  // Busca agendas por paciente
  static async getAgendasByPatient(patientId: string): Promise<IAgenda[]> {
    return Agenda.find({ patient: patientId })
      .populate('patient')
      .populate('therapist');
  }

  // Busca uma agenda pelo seu ID
  static async getAgendaById(id: string): Promise<IAgenda | null> {
    return Agenda.findById(id)
      .populate('patient')
      .populate('therapist');
  }

  // Atualiza a agenda com os dados informados
  static async updateAgenda(id: string, updates: Partial<IAgenda>): Promise<IAgenda | null> {
    updates.updated_at = new Date();
    return Agenda.findByIdAndUpdate(id, updates, { new: true });
  }

  // Exclui uma agenda pelo seu ID
  static async deleteAgenda(id: string): Promise<IAgenda | null> {
    return Agenda.findByIdAndDelete(id);
  }

  // Busca consultas futuras a partir do horário atual
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
