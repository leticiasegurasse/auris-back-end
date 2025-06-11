/**
 * Serviço que realiza operações diretas no banco de dados relacionadas aos pacientes
 * Responsável por criar, buscar e atualizar pacientes no MongoDB
 */
import Patient, { IPatient } from '../models/Patient';
import mongoose from 'mongoose';

export class PatientService {
  /**
   * Cria um novo paciente
   * @param userId - ID do usuário associado ao paciente
   * @param therapistId - ID do terapeuta responsável
   * @param birthDate - Data de nascimento do paciente
   * @param diagnosis - Diagnóstico do paciente (opcional)
   * @returns Paciente criado
   */
  static async createPatient(
    userId: string,
    therapistId: string,
    birthDate: Date,
    diagnosis?: string
  ): Promise<IPatient> {
    const therapistObjectId = new mongoose.Types.ObjectId(therapistId);
    const parsedDate = new Date(birthDate);

    return Patient.create({
      userId,
      therapistId: therapistObjectId,
      birthDate: parsedDate,
      diagnosis
    });
  }

  /**
   * Busca todos os pacientes de um terapeuta com paginação
   * @param therapistId - ID do terapeuta
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Lista paginada de pacientes e informações de paginação
   */
  static async getPatientsByTherapist(therapistId: string, page: number = 1, limit: number = 5): Promise<{ patients: IPatient[], pagination: { total: number, page: number, limit: number, totalPages: number } }> {
    const skip = (page - 1) * limit;
    
    const [patients, total] = await Promise.all([
      Patient.find({ therapistId })
        .populate('userId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Patient.countDocuments({ therapistId })
    ]);

    return {
      patients,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Busca um paciente pelo seu ID
   * @param id - ID do paciente
   * @returns Paciente encontrado ou null
   */
  static async getPatientById(id: string): Promise<IPatient | null> {
    return Patient.findById(id).populate('userId');
  }

  /**
   * Busca um paciente pelo ID do usuário associado
   * @param userId - ID do usuário
   * @returns Paciente encontrado ou null
   */
  static async getPatientByUserId(userId: string): Promise<IPatient | null> {
    return Patient.findOne({ userId: new mongoose.Types.ObjectId(userId) }).populate('userId');
  }

  /**
   * Atualiza os dados de um paciente
   * @param id - ID do paciente
   * @param updates - Dados a serem atualizados
   * @returns Paciente atualizado ou null
   */
  static async updatePatient(id: string, updates: Partial<IPatient>): Promise<IPatient | null> {
    return Patient.findByIdAndUpdate(id, updates, { new: true });
  }
}