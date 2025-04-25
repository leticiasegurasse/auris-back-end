import Exercise from '../models/Exercise';

export class ExerciseService {
  static async create(data: any) {
    return Exercise.create(data);
  }

  static async getAllByCategory(categoryId: string) {
    return Exercise.find({ categoryId });
  }

  static async update(id: string, data: any) {
    return Exercise.findByIdAndUpdate(id, data, { new: true });
  }
}
