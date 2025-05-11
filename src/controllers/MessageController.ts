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
      const { sender, content, notes } = req.body;

      // Adiciona a mensagem do usuário
      const updated = await ConversationBusiness.addMessage(conversationId, { sender, content });

      // Se foi o usuário que enviou, chama a API do GPT
      if (sender === 'user') {
        const messages = updated?.messages || [];
        
        // Pega as últimas 3 mensagens
        const lastThreeMessages = messages.slice(-4);
        
        // Formata o conteúdo com o contexto
        const formattedContent = `Siga o seguinte contexto para responder a mensagem do usuário:
            Contexto do paciente:
            ${notes || 'Nenhum contexto adicional fornecido'}

            histórico das últimas 3 mensagens:
            ${lastThreeMessages.map(m => `${m.sender}: ${m.content}`).join('\n')}

            mensagem que deve ser respondida:
            ${content}`;

        // Cria a mensagem formatada para o GPT
        const gptMessage = {
          role: 'user' as const,
          content: formattedContent
        };

        console.log("gptMessage", gptMessage);

        const assistantReply = await getGPTResponse([gptMessage]);

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
