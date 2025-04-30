import PatientExercise from '../models/PatientExercise';

export class PatientExerciseService {
  static async create(data: any) {
    return PatientExercise.create(data);
  }

  static async getAllByPatient(patientId: string) {
    return PatientExercise.find({ patientId })
      .populate('exerciseId') // 👈 adiciona isso!
      .exec();
  }

  static async getById(id: string) {
    return PatientExercise.findById(id);
  }

  static async update(id: string, data: any) {
    return PatientExercise.findByIdAndUpdate(id, data, { new: true });
  }

  static async updateReview(id: string, review: any) {
    return PatientExercise.findByIdAndUpdate(
      id,
      { therapistReview: { ...review, createdAt: new Date() } },
      { new: true }
    );
  }
  
  static async getReview(id: string) {
    const exercise = await PatientExercise.findById(id);
    return exercise?.therapistReview;
  }

  static async deleteIfPending(id: string) {
    const exercise = await PatientExercise.findById(id);
    
    if (!exercise) {
      throw new Error('Exercício não encontrado');
    }

    if (exercise.status !== 'pending') {
      throw new Error('Apenas exercícios pendentes podem ser excluídos');
    }

    await PatientExercise.findByIdAndDelete(id);
    return { message: 'Exercício excluído com sucesso' };
  }
}
