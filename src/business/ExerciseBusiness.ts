/**
 * Classe que implementa as regras de negócio relacionadas aos exercícios fonoaudiológicos
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { ExerciseService } from '../services/ExerciseService';

export class ExerciseBusiness {
  /**
   * Cria um novo exercício
   * @param data - Dados do exercício (título, descrição, instruções, categoria e referência do áudio)
   * @returns Exercício criado
   */
  static async create(data: any) {
    return ExerciseService.create(data);
  }

  /**
   * Busca exercícios por categoria com paginação
   * @param categoryId - ID da categoria
   * @param page - Número da página (padrão: 1)
   * @param limit - Limite de itens por página (padrão: 5)
   * @returns Lista paginada de exercícios
   */
  static async getAllByCategory(categoryId: string, page: number = 1, limit: number = 5) {
    return ExerciseService.getAllByCategory(categoryId, page, limit);
  }

  /**
   * Atualiza um exercício existente
   * @param id - ID do exercício
   * @param data - Novos dados do exercício
   * @returns Exercício atualizado
   */
  static async update(id: string, data: any) {
    return ExerciseService.update(id, data);
  }

  /**
   * Busca um exercício pelo seu ID
   * @param id - ID do exercício
   * @returns Exercício encontrado
   */
  static async getById(id: string) {
    return ExerciseService.getById(id);
  }

  /**
   * Exclui um exercício
   * @param id - ID do exercício
   * @returns Exercício excluído
   * @throws Erro se existirem pacientes vinculados ao exercício
   */
  static async delete(id: string) {
    return ExerciseService.delete(id);
  }
}
