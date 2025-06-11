/**
 * Serviço que faz as operações diretas no banco de dados relacionadas à autenticação
 * Responsável por buscar e criar usuários no MongoDB
 */
import User, { IUser } from '../models/User';

export class AuthService {
  /**
   * Busca um usuário pelo email
   * @param email - Email do usuário
   * @returns Usuário encontrado ou null
   */
  static async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  /**
   * Busca um usuário pelo ID
   * @param id - ID do usuário
   * @returns Usuário encontrado ou null
   */
  static async findById(id: string): Promise<IUser | null> {
    return User.findById(id);
  }

  /**
   * Cria um novo usuário
   * @param data - Dados do usuário
   * @returns Usuário criado
   */
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    return User.create(data);
  }
}
