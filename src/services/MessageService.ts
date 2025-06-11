/**
 * Serviço que realiza operações diretas no banco de dados relacionadas às conversas e mensagens
 * Responsável por criar, buscar e atualizar conversas no MongoDB
 */
import Conversation from '../models/Message';
import { Types } from 'mongoose';

export class ConversationService {
  /**
   * Cria uma nova conversa para um usuário
   * @param userId - ID do usuário
   * @returns Conversa criada com array de mensagens vazio
   */
  static async createConversation(userId: string) {
    return Conversation.create({ userId, messages: [] });
  }

  /**
   * Busca todas as conversas de um usuário
   * @param userId - ID do usuário
   * @returns Lista de conversas do usuário
   */
  static async getConversationsByUser(userId: string) {
    return Conversation.find({ userId });
  }

  /**
   * Busca todas as mensagens de uma conversa
   * @param conversationId - ID da conversa
   * @returns Lista de mensagens da conversa ou array vazio se não encontrar
   */
  static async getMessages(conversationId: string) {
    const conv = await Conversation.findById(conversationId);
    return conv?.messages || [];
  }

  /**
   * Adiciona uma nova mensagem em uma conversa
   * @param conversationId - ID da conversa
   * @param message - Dados da mensagem (sender e content)
   * @returns Conversa atualizada com a nova mensagem
   */
  static async addMessage(conversationId: string, message: { sender: string, content: string }) {
    return Conversation.findByIdAndUpdate(
      conversationId,
      { $push: { messages: message } },
      { new: true }
    );
  }
}
