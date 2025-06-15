/**
 * Serviço que faz as operações diretas no banco de dados das categorias de exercícios
 * Responsável por criar, buscar, atualizar e excluir categorias no MongoDB
 */
import Category from '../models/Category';
import Exercise from '../models/Exercise';

export class CategoryService {
  /**
   * Cria uma nova categoria no banco de dados
   * @param data - Dados da categoria (título, descrição e ID do terapeuta)
   * @returns Categoria criada
   */
  static async create(data: any) {
    return Category.create(data);
  }

  /**
   * Busca todas as categorias de um terapeuta
   * @param therapistId - ID do terapeuta
   * @returns Lista de categorias do terapeuta
   */
  static async getAllByTherapist(therapistId: string) {
    return Category.find({ therapistId });
  }

  /**
   * Busca uma categoria pelo seu ID
   * @param id - ID da categoria
   * @returns Categoria encontrada
   */
  static async getById(id: string) {
    return Category.findById(id);
  }

  /**
   * Atualiza uma categoria existente
   * @param id - ID da categoria
   * @param data - Novos dados da categoria
   * @returns Categoria atualizada
   */
  static async update(id: string, data: any) {
    return Category.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Exclui uma categoria
   * @param id - ID da categoria
   * @returns Categoria excluída
   * @throws Erro se existirem exercícios vinculados à categoria
   */
  static async delete(id: string) {
    // Verifica se existem exercícios vinculados à categoria
    const exercises = await Exercise.find({ categoryId: id });
    
    if (exercises.length > 0) {
      throw new Error(`Não é possível excluir a categoria pois existem ${exercises.length} exercício(s) vinculado(s) a ela. Por favor, remova ou mova os exercícios para outra categoria antes de excluir.`);
    }

    return Category.findByIdAndDelete(id);
  }

  /**
   * Conta a quantidade de exercícios em cada categoria de um terapeuta
   * @param therapistId - ID do terapeuta
   * @returns Lista de categorias com a contagem de exercícios
   */
  static async countExercisesByCategory(therapistId: string) {
    const categories = await Category.find({ therapistId });
    
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const exerciseCount = await Exercise.countDocuments({ categoryId: category._id });
        return {
          _id: category._id,
          title: category.title,
          description: category.description,
          exerciseCount
        };
      })
    );

    return categoriesWithCount;
  }
}
