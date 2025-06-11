/**
 * Serviço que faz as operações diretas no banco de dados dos exercícios fonoaudiológicos
 * Responsável por criar, buscar, atualizar e excluir exercícios no MongoDB
 */
import Exercise from '../models/Exercise';
import PatientExercise from '../models/PatientExercise';

export class ExerciseService {
  /**
   * Cria um novo exercício no banco de dados
   * @param data - Dados do exercício (título, descrição, instruções, categoria e referência do áudio)
   * @returns Exercício criado
   */
  static async create(data: any) {
    return Exercise.create(data);
  }

  /**
   * Busca exercícios por categoria com paginação
   * @param categoryId - ID da categoria
   * @param page - Número da página
   * @param limit - Limite de itens por página
   * @returns Objeto contendo lista de exercícios e informações de paginação
   */
  static async getAllByCategory(categoryId: string, page: number = 1, limit: number = 5) {
    const skip = (page - 1) * limit;
    
    const [exercises, total] = await Promise.all([
      Exercise.find({ categoryId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Exercise.countDocuments({ categoryId })
    ]);

    return {
      exercises,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Atualiza um exercício existente
   * @param id - ID do exercício
   * @param data - Novos dados do exercício
   * @returns Exercício atualizado
   */
  static async update(id: string, data: any) {
    return Exercise.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Busca um exercício pelo seu ID
   * @param id - ID do exercício
   * @returns Exercício encontrado
   */
  static async getById(id: string) {
    return Exercise.findById(id);
  }

  /**
   * Exclui um exercício
   * @param id - ID do exercício
   * @returns Exercício excluído
   * @throws Erro se existirem pacientes vinculados ao exercício
   */
  static async delete(id: string) {
    // Verifica se existem PatientExercises vinculados ao exercício
    const patientExercises = await PatientExercise.find({ exerciseId: id });
    
    if (patientExercises.length > 0) {
      throw new Error('Não é possível excluir o exercício pois existem pacientes vinculados a ele');
    }

    return Exercise.findByIdAndDelete(id);
  }
}
