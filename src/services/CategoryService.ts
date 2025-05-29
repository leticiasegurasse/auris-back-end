import Category from '../models/Category';
import Exercise from '../models/Exercise';

export class CategoryService {
  static async create(data: any) {
    return Category.create(data);
  }

  static async getAllByTherapist(therapistId: string) {
    return Category.find({ therapistId });
  }

  static async getById(id: string) {
    return Category.findById(id);
  }

  static async update(id: string, data: any) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  static async delete(id: string) {
    // Verifica se existem exercícios vinculados à categoria
    const exercises = await Exercise.find({ categoryId: id });
    
    if (exercises.length > 0) {
      throw new Error(`Não é possível excluir a categoria pois existem ${exercises.length} exercício(s) vinculado(s) a ela. Por favor, remova ou mova os exercícios para outra categoria antes de excluir.`);
    }

    return Category.findByIdAndDelete(id);
  }
}
