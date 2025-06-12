/**
 * Controlador que gerencia as operações dos fonoaudiólogos
 * É aqui que recebemos as requisições e enviamos as respostas
 */
import { Request, Response } from 'express';
import { TherapistBusiness } from '../business/TherapistBusiness';
import { CacheService } from '../services/cache.service';

export class TherapistController {
  /**
   * Busca um fonoaudiólogo pelo seu ID
   * @param req - Requisição com o ID do fonoaudiólogo
   * @param res - Resposta que será enviada
   * @returns Os dados do fonoaudiólogo ou uma mensagem de erro
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const therapist = await TherapistBusiness.getById(id);
      res.json(therapist);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Atualiza os dados de um fonoaudiólogo
   * @param req - Requisição com o ID do fonoaudiólogo e os novos dados
   * @param res - Resposta que será enviada
   * @returns Os dados atualizados do fonoaudiólogo ou uma mensagem de erro
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updated = await TherapistBusiness.update(id, updates);
      
      // Limpa o cache após atualizar com sucesso
      await CacheService.getInstance().clear();
      
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca todos os fonoaudiólogos
   * @param req - Requisição
   * @param res - Resposta que será enviada
   * @returns Lista com todos os fonoaudiólogos ou uma mensagem de erro
   */
  static async getAll(req: Request, res: Response) {
    try {
      const therapists = await TherapistBusiness.getAll();
      res.json(therapists);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Cancela a assinatura de um fonoaudiólogo
   * @param req - Requisição com o ID do fonoaudiólogo
   * @param res - Resposta que será enviada
   * @returns Mensagem de sucesso e dados do fonoaudiólogo ou uma mensagem de erro
   */
  static async cancelSubscription(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const therapist = await TherapistBusiness.cancelSubscription(id);
      res.json({ 
        message: 'Assinatura cancelada com sucesso',
        therapist 
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
