import express from 'express';
import { ConversationController } from '../controllers/MessageController';

const router = express.Router();

router.post('/', ConversationController.createConversation);
router.get('/:userId', ConversationController.getConversations);
router.get('/:conversationId/messages', ConversationController.getMessages);
router.post('/:conversationId/messages', ConversationController.addMessage);

export default router;
