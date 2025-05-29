import { ExerciseService } from '../services/ExerciseService';

export class ExerciseBusiness {
  static async create(data: any) {
    return ExerciseService.create(data);
  }

  static async getAllByCategory(categoryId: string, page: number = 1, limit: number = 5) {
    return ExerciseService.getAllByCategory(categoryId, page, limit);
  }

  static async update(id: string, data: any) {
    return ExerciseService.update(id, data);
  }

  static async getById(id: string) {
    return ExerciseService.getById(id);
  }

  static async delete(id: string) {
    return ExerciseService.delete(id);
  }
}
