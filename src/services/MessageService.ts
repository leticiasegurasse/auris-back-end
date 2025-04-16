import Conversation from '../models/Message';
import { Types } from 'mongoose';

export class ConversationService {
  static async createConversation(userId: string) {
    return Conversation.create({ userId, messages: [] });
  }

  static async getConversationsByUser(userId: string) {
    return Conversation.find({ userId });
  }

  static async getMessages(conversationId: string) {
    const conv = await Conversation.findById(conversationId);
    return conv?.messages || [];
  }

  static async addMessage(conversationId: string, message: { sender: string, content: string }) {
    return Conversation.findByIdAndUpdate(
      conversationId,
      { $push: { messages: message } },
      { new: true }
    );
  }
}
