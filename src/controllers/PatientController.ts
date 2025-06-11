/**
 * Controlador que gerencia as operações relacionadas aos pacientes
 * Responsável por buscar e atualizar informações dos pacientes
 */
import { Request, Response } from 'express';
import { PatientBusiness } from '../business/PatientBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientController {
  /**
   * Busca todos os pacientes de um terapeuta com paginação
   * @param req - Requisição contendo o ID do terapeuta no token e parâmetros de paginação
   * @param res - Resposta HTTP
   * @returns Lista paginada de pacientes ou erro
   */
  static async getAllByTherapist(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const therapistId = req.user?.id;
      if (!therapistId) {
        res.status(401).json({ message: 'Therapist ID is missing in token.' });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      const result = await PatientBusiness.getAllByTherapist(therapistId, page, limit);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca um paciente pelo seu ID
   * @param req - Requisição contendo o ID do paciente
   * @param res - Resposta HTTP
   * @returns Paciente encontrado ou erro
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await PatientBusiness.getById(id);
      res.json(patient);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Atualiza os dados de um paciente
   * @param req - Requisição contendo o ID do paciente e os dados a serem atualizados
   * @param res - Resposta HTTP
   * @returns Paciente atualizado ou erro
   */
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updated = await PatientBusiness.update(id, updates);
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}