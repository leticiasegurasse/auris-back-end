import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { CategoryBusiness } from '../business/CategoryBusiness';

export class CategoryController {
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

      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

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

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await CategoryBusiness.getById(id);
      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const updated = await CategoryBusiness.update(id, {
        title,
        description,
      });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await CategoryBusiness.delete(id);
      res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
