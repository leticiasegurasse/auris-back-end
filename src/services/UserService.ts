/**
 * Classe que faz as operações diretas no banco de dados
 * É aqui que salvamos, buscamos e atualizamos as informações dos usuários
 */
import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export class UserService {
  /**
   * Cria um novo usuário no sistema
   * @param userId - ID do usuário
   * @param crfa - Número do registro do fonoaudiólogo
   * @returns O usuário que foi criado
   */
  static async createUser(userId: string, crfa: string): Promise<IUser> {
    const objectId = new mongoose.Types.ObjectId(userId);
    return User.create({ userId: objectId, crfa });
  }
  
  /**
   * Busca as informações de um usuário usando seu ID
   * @param id - ID do usuário que queremos encontrar
   * @returns As informações do usuário ou nada se não encontrar
   */
  static async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  /**
   * Atualiza as informações de um usuário
   * @param id - ID do usuário que queremos atualizar
   * @param updates - Novas informações do usuário
   * @returns As informações atualizadas do usuário ou nada se não encontrar
   */
  static async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, updates, { new: true }); //new: true retorna o usuário atualizado
  }
}
