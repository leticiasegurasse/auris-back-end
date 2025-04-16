import { ConversationService } from '../services/MessageService';

export class ConversationBusiness {
  static async createConversation(userId: string) {
    return ConversationService.createConversation(userId);
  }

  static async getConversationsByUser(userId: string) {
    return ConversationService.getConversationsByUser(userId);
  }

  static async getMessages(conversationId: string) {
    return ConversationService.getMessages(conversationId);
  }

  static async addMessage(conversationId: string, message: { sender: string, content: string }) {
    return ConversationService.addMessage(conversationId, message);
  }
}
