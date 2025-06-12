/**
 * Controlador que gerencia as operações relacionadas à agenda de consultas
 * Responsável por criar, buscar, atualizar e excluir agendamentos
 */
import { Request, Response } from 'express';
import { AgendaBusiness } from '../business/AgendaBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { CacheService } from '../services/cache.service';

export class AgendaController {
  /**
   * Cria um novo agendamento na agenda
   * @param req - Requisição contendo os dados do agendamento (paciente, terapeuta, data/hora, especialidade e observações)
   * @param res - Resposta HTTP
   * @returns Agendamento criado ou erro
   */
  static async create(req: Request, res: Response) {
    try {
      const { patient, therapist, consultationDateTime, specialty, observations } = req.body;
      const agenda = await AgendaBusiness.create({ patient, therapist, consultationDateTime, specialty, observations });
      
      // Limpa o cache após criar com sucesso
      await CacheService.getInstance().clear();
      
      res.status(201).json(agenda);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retorna todas as consultas do fonoaudiólogo logado
   * @param req - Requisição contendo o ID do terapeuta no token
   * @param res - Resposta HTTP
   * @returns Lista de agendamentos ou erro
   */
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const therapistId = req.user?.id;
      console.log(therapistId);
      const agendas = await AgendaBusiness.getByTherapist(therapistId);
      res.json(agendas);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retorna todas as consultas de um paciente específico
   * @param req - Requisição contendo o ID do paciente nos parâmetros
   * @param res - Resposta HTTP
   * @returns Lista de agendamentos do paciente ou erro
   */
  static async getByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const agendas = await AgendaBusiness.getByPatient(patientId);
      res.json(agendas);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retorna um agendamento específico pelo ID
   * @param req - Requisição contendo o ID do agendamento nos parâmetros
   * @param res - Resposta HTTP
   * @returns Agendamento encontrado ou erro
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const agenda = await AgendaBusiness.getById(id);
      res.json(agenda);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Atualiza os dados de um agendamento existente
   * @param req - Requisição contendo o ID do agendamento nos parâmetros e os dados de atualização no body
   * @param res - Resposta HTTP
   * @returns Agendamento atualizado ou erro
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedAgenda = await AgendaBusiness.update(id, updates);
      res.json(updatedAgenda);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Exclui um agendamento pelo ID
   * @param req - Requisição contendo o ID do agendamento nos parâmetros
   * @param res - Resposta HTTP
   * @returns Agendamento excluído ou erro
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedAgenda = await AgendaBusiness.delete(id);
      res.json(deletedAgenda);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Retorna todas as consultas futuras do fonoaudiólogo logado
   * @param req - Requisição contendo o ID do terapeuta no token
   * @param res - Resposta HTTP
   * @returns Lista de consultas futuras ou erro
   */
  static async getFutureConsultations(req: AuthenticatedRequest, res: Response) {
    try {
      const therapistId = req.user?.id;
      if (!therapistId) {
        throw new Error('Usuário não autenticado');
      }
      const consultations = await AgendaBusiness.getFutureConsultations(therapistId);
      res.json(consultations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
