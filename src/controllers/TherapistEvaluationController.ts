/**
 * Controlador que gerencia as avaliações feitas pelos fonoaudiólogos
 * É aqui que recebemos as requisições e enviamos as respostas
 */
import { Request, Response } from 'express';
import { TherapistEvaluationBusiness } from '../business/TherapistEvaluationBusiness';

export class TherapistEvaluationController {
  /**
   * Cria uma nova avaliação
   * @param req - Requisição com os dados da avaliação (comentário, feedback, pontuação e ID da resposta)
   * @param res - Resposta que será enviada
   * @returns A avaliação criada ou uma mensagem de erro
   */
  static async create(req: Request, res: Response) {
    try {
      const { patientResponseId, therapistComment, therapistFeedback, score } = req.body;

      const evaluation = await TherapistEvaluationBusiness.create({
        patientResponseId,
        therapistComment,
        therapistFeedback,
        score
      });

      res.status(201).json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca todas as avaliações
   * @param req - Requisição
   * @param res - Resposta que será enviada
   * @returns Lista com todas as avaliações ou uma mensagem de erro
   */
  static async getAll(req: Request, res: Response) {
    try {
      const evaluations = await TherapistEvaluationBusiness.getAll();
      res.json(evaluations);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca uma avaliação pelo seu ID
   * @param req - Requisição com o ID da avaliação
   * @param res - Resposta que será enviada
   * @returns A avaliação encontrada ou uma mensagem de erro
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const evaluation = await TherapistEvaluationBusiness.getById(id);
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza uma avaliação existente
   * @param req - Requisição com o ID da avaliação e os novos dados
   * @param res - Resposta que será enviada
   * @returns A avaliação atualizada ou uma mensagem de erro
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { therapistComment, therapistFeedback, score } = req.body;

      const updated = await TherapistEvaluationBusiness.update(id, {
        therapistComment,
        therapistFeedback,
        score
      });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca uma avaliação pelo ID da resposta do paciente
   * @param req - Requisição com o ID da resposta do paciente
   * @param res - Resposta que será enviada
   * @returns A avaliação encontrada ou uma mensagem de erro
   */
  static async getByPatientResponseId(req: Request, res: Response) {
    try {
      const { patientResponseId } = req.params;
      const evaluation = await TherapistEvaluationBusiness.getByPatientResponseId(patientResponseId);
      res.json(evaluation);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}