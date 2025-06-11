/**
 * Classe que implementa as regras de negócio relacionadas às conversas e mensagens
 * Responsável por validar e processar as operações antes de acessar o banco de dados
 */
import { ConversationService } from '../services/MessageService';

export class ConversationBusiness {
  /**
   * Cria uma nova conversa para um usuário
   * @param userId - ID do usuário
   * @returns Conversa criada
   */
  static async createConversation(userId: string) {
    return ConversationService.createConversation(userId);
  }

  /**
   * Busca todas as conversas de um usuário
   * @param userId - ID do usuário
   * @returns Lista de conversas do usuário
   */
  static async getConversationsByUser(userId: string) {
    return ConversationService.getConversationsByUser(userId);
  }

  /**
   * Busca todas as mensagens de uma conversa
   * @param conversationId - ID da conversa
   * @returns Lista de mensagens da conversa
   */
  static async getMessages(conversationId: string) {
    return ConversationService.getMessages(conversationId);
  }

  /**
   * Adiciona uma nova mensagem em uma conversa
   * @param conversationId - ID da conversa
   * @param message - Dados da mensagem (sender e content)
   * @returns Conversa atualizada com a nova mensagem
   */
  static async addMessage(conversationId: string, message: { sender: string, content: string }) {
    return ConversationService.addMessage(conversationId, message);
  }
}
