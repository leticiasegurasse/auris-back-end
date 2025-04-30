import Exercise from '../models/Exercise';
import PatientExercise from '../models/PatientExercise';

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

  static async getById(id: string) {
    return Exercise.findById(id);
  }

  static async delete(id: string) {
    // Verifica se existem PatientExercises vinculados ao exercício
    const patientExercises = await PatientExercise.find({ exerciseId: id });
    
    if (patientExercises.length > 0) {
      throw new Error('Não é possível excluir o exercício pois existem pacientes vinculados a ele');
    }

    return Exercise.findByIdAndDelete(id);
  }
}
