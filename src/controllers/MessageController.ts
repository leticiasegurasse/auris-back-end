import { Request, Response } from 'express';
import { ConversationBusiness } from '../business/MessageBusiness';
import { getGPTResponse } from '../utils/openai/gpt';

export class ConversationController {
  static async createConversation(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const conversation = await ConversationBusiness.createConversation(userId);
      res.status(201).json(conversation);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getConversations(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const conversations = await ConversationBusiness.getConversationsByUser(userId);
      res.json(conversations);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getMessages(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const messages = await ConversationBusiness.getMessages(conversationId);
      res.json(messages);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async addMessage(req: Request, res: Response) {
    try {
      const { conversationId } = req.params;
      const { sender, content } = req.body;

      // Adiciona a mensagem do usuário
      const updated = await ConversationBusiness.addMessage(conversationId, { sender, content });

      // Se foi o usuário que enviou, chama a API do GPT
      if (sender === 'user') {
        const messages = updated?.messages || [];

        const gptMessages = messages.map((m: any) => ({
            role: m.sender as 'user' | 'assistant',
            content: m.content
        }));
    
        const assistantReply = await getGPTResponse(gptMessages);

        await ConversationBusiness.addMessage(conversationId, {
          sender: 'assistant',
          content: assistantReply
        });
      }

      res.status(201).json({ success: true });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
