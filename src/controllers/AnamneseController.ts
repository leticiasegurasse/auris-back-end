import { Request, Response } from 'express';
import { AnamneseBusiness } from '../business/AnamneseBusiness';

export class AnamneseController {
  // Cria uma nova anamnese
  static async create(req: Request, res: Response) {
    try {
      const { fono, user, anamnese } = req.body;
      const newAnamnese = await AnamneseBusiness.create({ fono, user, anamnese });
      res.status(201).json(newAnamnese);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lista todas as anamneses
  static async getAll(req: Request, res: Response) {
    try {
      const anamneses = await AnamneseBusiness.getAll();
      res.json(anamneses);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Busca uma anamnese pelo ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const anamnesis = await AnamneseBusiness.getById(id);
      res.json(anamnesis);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  // Atualiza uma anamnese existente
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedAnamnese = await AnamneseBusiness.update(id, updates);
      res.json(updatedAnamnese);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Exclui uma anamnese
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedAnamnese = await AnamneseBusiness.delete(id);
      res.json(deletedAnamnese);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
