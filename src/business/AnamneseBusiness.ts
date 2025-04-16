import { AnamneseService } from '../services/AnamneseService';
import { IAnamnese } from '../models/Anamnese';

interface CreateAnamneseDTO {
  fono: string;
  user: string;
  anamnese: string;
}

export class AnamneseBusiness {
  // Cria uma nova anamnese
  static async create(data: CreateAnamneseDTO): Promise<IAnamnese> {
    return AnamneseService.createAnamnese(data);
  }

  // Lista todas as anamneses
  static async getAll(): Promise<IAnamnese[]> {
    return AnamneseService.getAllAnamneses();
  }

  // Busca uma anamnese pelo ID
  static async getById(id: string): Promise<IAnamnese> {
    const anamnesis = await AnamneseService.getAnamneseById(id);
    if (!anamnesis) throw new Error('Anamnese not found');
    return anamnesis;
  }

  // Atualiza uma anamnese
  static async update(id: string, data: Partial<IAnamnese>): Promise<IAnamnese> {
    const updated = await AnamneseService.updateAnamnese(id, data);
    if (!updated) throw new Error('Failed to update anamnese');
    return updated;
  }

  // Remove uma anamnese
  static async delete(id: string): Promise<IAnamnese> {
    const deleted = await AnamneseService.deleteAnamnese(id);
    if (!deleted) throw new Error('Failed to delete anamnese');
    return deleted;
  }
}
