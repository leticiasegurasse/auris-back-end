/**
 * Rotas de Mensagens
 * Este arquivo contém as rotas para gerenciamento de conversas e mensagens entre usuários.
 */
import express from 'express';
import { ConversationController } from '../controllers/MessageController';

const router = express.Router();

// Cria uma nova conversa
router.post('/', ConversationController.createConversation);

// Lista todas as conversas de um usuário
router.get('/:userId', ConversationController.getConversations);

// Lista todas as mensagens de uma conversa
router.get('/:conversationId/messages', ConversationController.getMessages);

// Adiciona uma nova mensagem em uma conversa
router.post('/:conversationId/messages', ConversationController.addMessage);

export default router;
