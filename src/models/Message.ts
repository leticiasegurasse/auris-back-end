// Importa o Mongoose e os tipos necessários
import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura de uma mensagem individual
 */
interface IMessage {
  /** Identificador de quem enviou a mensagem (ex: 'user', 'bot') */
  sender: string;
  /** Conteúdo da mensagem em texto */
  content: string;
}

/**
 * Interface que define a estrutura de um documento da coleção Conversation no MongoDB
 */
export interface IConversation extends Document {
  /** ID do usuário dono da conversa */
  userId: mongoose.Types.ObjectId;
  /** Lista de mensagens da conversa */
  messages: IMessage[];
}

/**
 * Schema para a subdocumento "Message"
 * Define como cada mensagem deve ser armazenada dentro de uma conversa
 */
const MessageSchema: Schema = new Schema({
  // Campo "sender" obrigatório, indica quem enviou a mensagem
  sender: { type: String, required: true },

  // Campo "content" obrigatório, contém o texto da mensagem
  content: { type: String, required: true }

  // O { _id: true } cria um _id automaticamente para cada mensagem
}, { _id: true });

/**
 * Schema principal para o documento "Conversation"
 * Representa uma conversa completa associada a um usuário
 */
const ConversationSchema: Schema = new Schema({
  // Campo "userId", uma referência ao model "User" (cria uma relação entre User e Conversation)
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

  // Campo "messages", um array de subdocumentos definidos pelo MessageSchema
  messages: [MessageSchema]
});

/**
 * Exporta o model "Conversation"
 * Permite realizar operações no banco de dados (criar, buscar, atualizar, deletar conversas)
 */
export default mongoose.model<IConversation>('Conversation', ConversationSchema);
