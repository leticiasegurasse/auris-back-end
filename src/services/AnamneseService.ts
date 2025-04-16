import Anamnese, { IAnamnese } from '../models/Anamnese';
import mongoose from 'mongoose';

interface CreateAnamneseDTO {
  fono: string;
  user: string;
  anamnese: string;
}

export class AnamneseService {
  // Cria uma nova anamnese
  static async createAnamnese(data: CreateAnamneseDTO): Promise<IAnamnese> {
    const fonoId = new mongoose.Types.ObjectId(data.fono);
    const userId = new mongoose.Types.ObjectId(data.user);

    return Anamnese.create({
      fono: fonoId,
      user: userId,
      anamnese: data.anamnese
    });
  }

  // Retorna todas as anamneses cadastradas
  static async getAllAnamneses(): Promise<IAnamnese[]> {
    return Anamnese.find()
      .populate('fono')
      .populate('user');
  }

  // Busca uma anamnese pelo ID
  static async getAnamneseById(id: string): Promise<IAnamnese | null> {
    return Anamnese.findById(id)
      .populate('fono')
      .populate('user');
  }

  // Atualiza uma anamnese
  static async updateAnamnese(id: string, updates: Partial<IAnamnese>): Promise<IAnamnese | null> {
    updates.updated_at = new Date();
    return Anamnese.findByIdAndUpdate(id, updates, { new: true });
  }

  // Exclui uma anamnese
  static async deleteAnamnese(id: string): Promise<IAnamnese | null> {
    return Anamnese.findByIdAndDelete(id);
  }
}
