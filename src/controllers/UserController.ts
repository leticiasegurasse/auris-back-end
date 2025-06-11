/**
 * Controlador responsável por gerenciar as operações relacionadas aos usuários
 * Este controlador lida com as requisições HTTP
 */
import { Request, Response } from 'express';
import { UserBusiness } from '../business/UserBusiness';

export class UserController {
  /**
   * Busca um usuário pelo seu ID
   * @param req - Objeto de requisição contendo o ID do usuário nos parâmetros
   * @param res - Objeto de resposta para enviar o resultado
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserBusiness.getById(id);
      res.json(user);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  /**
   * Atualiza os dados de um usuário
   * @param req - Objeto de requisição contendo o ID do usuário nos parâmetros e os dados de atualização no body
   * @param res - Objeto de resposta para enviar o resultado
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserBusiness.update(id, updates);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
