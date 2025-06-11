/**
 * Classe que cuida das regras de negócio dos usuários
 * É aqui que verificamos se tudo está correto antes de fazer as operações
 */
import { UserService } from "../services/UserService";
import { IUser } from '../models/User';

export class UserBusiness {
  /**
   * Busca as informações de um usuário usando seu ID
   * @param id - ID do usuário que queremos encontrar
   * @returns As informações do usuário
   * @throws Erro se o usuário não for encontrado
   */
  static async getById(id: string): Promise<IUser> {
    const user = await UserService.getUserById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  /**
   * Atualiza as informações de um usuário
   * @param id - ID do usuário que queremos atualizar
   * @param data - Novas informações do usuário
   * @returns As informações atualizadas do usuário
   * @throws Erro se não conseguir atualizar
   */
  static async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const updated = await UserService.updateUser(id, data);
    if (!updated) throw new Error('Failed to update User');
    return updated;
  }
}
