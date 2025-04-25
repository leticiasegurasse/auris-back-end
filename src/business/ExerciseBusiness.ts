import { ExerciseService } from '../services/ExerciseService';

export class ExerciseBusiness {
  static async create(data: any) {
    return ExerciseService.create(data);
  }

  static async getAllByCategory(categoryId: string) {
    return ExerciseService.getAllByCategory(categoryId);
  }

  static async update(id: string, data: any) {
    return ExerciseService.update(id, data);
  }
}
