/**
 * Serviço que faz as operações diretas no banco de dados dos exercícios dos pacientes
 * Responsável por criar, buscar, atualizar e excluir exercícios no MongoDB
 */
import PatientExercise from '../models/PatientExercise';

export class PatientExerciseService {
  /**
   * Cria um novo exercício no banco de dados
   * @param data - Dados do exercício (patientId, exerciseId, status, etc)
   * @returns Exercício criado
   */
  static async create(data: any) {
    return PatientExercise.create(data);
  }

  /**
   * Busca todos os exercícios de um paciente
   * @param patientId - ID do paciente
   * @returns Lista de exercícios do paciente com dados do exercício populados
   */
  static async getAllByPatient(patientId: string) {
    return PatientExercise.find({ patientId })
      .populate('exerciseId')
      .exec();
  }

  /**
   * Busca um exercício pelo seu ID
   * @param id - ID do exercício
   * @returns Exercício encontrado
   */
  static async getById(id: string) {
    return PatientExercise.findById(id);
  }

  /**
   * Atualiza um exercício existente
   * @param id - ID do exercício
   * @param data - Novos dados do exercício
   * @returns Exercício atualizado
   */
  static async update(id: string, data: any) {
    return PatientExercise.findByIdAndUpdate(id, data, { new: true });
  }


  /**
   * Exclui um exercício pendente
   * @param id - ID do exercício
   * @returns Mensagem de sucesso
   * @throws Erro se o exercício não for encontrado ou não estiver pendente
   */
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
