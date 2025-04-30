import { Request, Response } from 'express';
import { AgendaBusiness } from '../business/AgendaBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class AgendaController {
  // Cria uma nova agenda
  static async create(req: Request, res: Response) {
    try {
      const { patient, therapist, consultationDateTime, specialty, observations } = req.body;
      const agenda = await AgendaBusiness.create({ patient, therapist, consultationDateTime, specialty, observations });
      res.status(201).json(agenda);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Retorna todas as agendas do fonoaudiólogo logado
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const therapistId = req.user?.id;
      const agendas = await AgendaBusiness.getByTherapist(therapistId);
      res.json(agendas);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Retorna todas as agendas de um paciente específico
  static async getByPatient(req: Request, res: Response) {
    try {
      const { patientId } = req.params;
      const agendas = await AgendaBusiness.getByPatient(patientId);
      res.json(agendas);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Retorna uma agenda específica por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const agenda = await AgendaBusiness.getById(id);
      res.json(agenda);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // Atualiza os dados de uma agenda existente
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

  // Exclui uma agenda por ID
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedAgenda = await AgendaBusiness.delete(id);
      res.json(deletedAgenda);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
