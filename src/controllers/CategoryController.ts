/**
 * Controlador que gerencia as operações relacionadas às categorias de exercícios
 * Responsável por criar, buscar, atualizar e excluir categorias
 */
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { CategoryBusiness } from '../business/CategoryBusiness';
import { CacheService } from '../services/cache.service';

export class CategoryController {
  /**
   * Cria uma nova categoria de exercícios
   * @param req - Requisição contendo os dados da categoria e ID do terapeuta no token
   * @param res - Resposta HTTP
   * @returns Categoria criada ou erro
   */
  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const therapistId = req.user?.id;
      if (!therapistId) {
        res.status(401).json({ message: 'Therapist ID is missing in token.' });
        return;
      }

      const { title, description } = req.body;

      const category = await CategoryBusiness.create({
        title,
        description,
        therapistId,
      });

      // Limpa o cache após criar com sucesso
      await CacheService.getInstance().clear();

      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca todas as categorias de um terapeuta
   * @param req - Requisição contendo o ID do terapeuta no token
   * @param res - Resposta HTTP
   * @returns Lista de categorias ou erro
   */
  static async getAllByTherapist(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const therapistId = req.user?.id;
      if (!therapistId) {
        res.status(401).json({ message: 'Therapist ID is missing in token.' });
        return;
      }

      const categories = await CategoryBusiness.getAllByTherapist(therapistId);
      res.json(categories);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Busca uma categoria pelo seu ID
   * @param req - Requisição contendo o ID da categoria
   * @param res - Resposta HTTP
   * @returns Categoria encontrada ou erro
   */
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await CategoryBusiness.getById(id);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza uma categoria existente
   * @param req - Requisição contendo o ID da categoria e novos dados
   * @param res - Resposta HTTP
   * @returns Categoria atualizada ou erro
   */
  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updated = await CategoryBusiness.update(id, {
        title,
        description,
      });

      // Limpa o cache após atualizar com sucesso
      await CacheService.getInstance().clear();

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Exclui uma categoria
   * @param req - Requisição contendo o ID da categoria
   * @param res - Resposta HTTP
   * @returns Mensagem de sucesso ou erro
   */
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CategoryBusiness.delete(id);
      
      // Limpa o cache após deletar com sucesso
      await CacheService.getInstance().clear();
      
      res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error: any) {
      res.status(400).json({ 
        error: true,
        message: error.message,
        details: 'Não foi possível excluir a categoria'
      });
    }
  }
}
