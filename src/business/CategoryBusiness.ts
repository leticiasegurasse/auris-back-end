/**
 * Classe que implementa as regras de negócio relacionadas às categorias de exercícios
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { CategoryService } from '../services/CategoryService';

export class CategoryBusiness {
  /**
   * Cria uma nova categoria
   * @param data - Dados da categoria (título, descrição e ID do terapeuta)
   * @returns Categoria criada
   */
  static async create(data: any) {
    return CategoryService.create(data);
  }

  /**
   * Busca todas as categorias de um terapeuta
   * @param therapistId - ID do terapeuta
   * @returns Lista de categorias do terapeuta
   */
  static async getAllByTherapist(therapistId: string) {
    return CategoryService.getAllByTherapist(therapistId);
  }

  /**
   * Busca uma categoria pelo seu ID
   * @param id - ID da categoria
   * @returns Categoria encontrada
   */
  static async getById(id: string) {
    return CategoryService.getById(id);
  }

  /**
   * Atualiza uma categoria existente
   * @param id - ID da categoria
   * @param data - Novos dados da categoria
   * @returns Categoria atualizada
   */
  static async update(id: string, data: any) {
    return CategoryService.update(id, data);
  }

  /**
   * Exclui uma categoria
   * @param id - ID da categoria
   * @returns Categoria excluída
   * @throws Erro se existirem exercícios vinculados à categoria
   */
  static async delete(id: string) {
    return CategoryService.delete(id);
  }

  /**
   * Conta a quantidade de exercícios em cada categoria de um terapeuta
   * @param therapistId - ID do terapeuta
   * @returns Lista de categorias com a contagem de exercícios
   */
  static async countExercisesByCategory(therapistId: string) {
    return CategoryService.countExercisesByCategory(therapistId);
  }
}
