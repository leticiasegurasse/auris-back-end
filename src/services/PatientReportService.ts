/**
 * Serviço que faz as operações diretas no banco de dados dos relatórios dos pacientes
 * Responsável por criar, buscar e atualizar relatórios no MongoDB
 */
import PatientReport from '../models/PatientReport';
import mongoose from 'mongoose';

export class PatientReportService {
  /**
   * Cria um novo relatório no banco de dados
   * @param data - Dados do relatório (report, observation, userId, patientId, type)
   * @returns Relatório criado
   */
  static async create(data: any) {
    return PatientReport.create(data);
  }

  /**
   * Busca todos os relatórios de um usuário (terapeuta) com paginação
   * @param userId - ID do usuário (terapeuta)
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Objeto contendo lista de relatórios e informações de paginação
   */
  static async getAllByUser(userId: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    
    const [reports, total] = await Promise.all([
      PatientReport.find({ userId })
        .populate('userId', 'name')
        .populate({
          path: 'patientId',
          populate: {
            path: 'userId',
            model: 'User',
            select: 'name_user'
          }
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      PatientReport.countDocuments({ userId })
    ]);

    return {
      reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Busca um relatório pelo seu ID
   * @param id - ID do relatório
   * @returns Relatório encontrado
   */
  static async getById(id: string) {
    return PatientReport.findById(id);
  }

  /**
   * Atualiza um relatório existente
   * @param id - ID do relatório
   * @param data - Novos dados do relatório
   * @returns Relatório atualizado
   */
  static async update(id: string, data: any) {
    return PatientReport.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Busca todos os relatórios de um paciente específico
   * @param patientId - ID do paciente
   * @returns Lista de relatórios do paciente com dados populados
   */
  static async getByPatientId(patientId: string) {
    const objectId = new mongoose.Types.ObjectId(patientId);
    return PatientReport.find({ patientId: objectId })
      .populate('userId', 'name')
      .populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name_user'
        }
      });
  }

  /**
   * Busca estatísticas dos relatórios de um usuário
   * @param userId - ID do usuário (terapeuta)
   * @returns Objeto contendo total de relatórios e contagem por tipo
   */
  static async getReportsStats(userId: string) {
    const [total, anamneseCount, evolucaoCount] = await Promise.all([
      PatientReport.countDocuments({ userId }),
      PatientReport.countDocuments({ userId, type: 'anamnese' }),
      PatientReport.countDocuments({ userId, type: 'evolucao' })
    ]);

    return {
      total,
      byType: {
        anamnese: anamneseCount,
        evolucao: evolucaoCount
      }
    };
  }

  /**
   * Busca relatórios pelo nome do paciente
   * @param userId - ID do usuário (terapeuta)
   * @param patientName - Nome do paciente para busca
   * @param page - Número da página para paginação
   * @param limit - Limite de itens por página
   * @returns Objeto contendo lista filtrada de relatórios e informações de paginação
   */
  static async getByPatientName(userId: string, patientName: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;

    // Primeiro, vamos buscar todos os relatórios do usuário
    const reports = await PatientReport.find({ userId })
      .populate('userId', 'name')
      .populate({
        path: 'patientId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'name_user'
        }
      })
      .sort({ createdAt: -1 });

    // Agora filtramos os relatórios pelo nome do paciente
    const filteredReports = reports.filter(report => {
      const patient = report.patientId as any;
      if (!patient || !patient.userId) return false;
      
      const patientNameLower = patient.userId.name_user.toLowerCase();
      const searchNameLower = patientName.toLowerCase();
      
      return patientNameLower.includes(searchNameLower);
    });

    // Aplicamos a paginação após o filtro
    const paginatedReports = filteredReports.slice(skip, skip + limit);
    const total = filteredReports.length;

    return {
      reports: paginatedReports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
}