import mongoose from 'mongoose';

/**
 * Schema do MongoDB para o log de ações
 * Define a estrutura e validações dos dados de auditoria
 */
const logSchema = new mongoose.Schema({
  /** Tipo da ação realizada (CREATE, UPDATE, DELETE) */
  action: {
    type: String,
    required: true,
    enum: ['CREATE', 'UPDATE', 'DELETE']
  },
  /** Nome da entidade afetada pela ação */
  entity: {
    type: String,
    required: true
  },
  /** ID da entidade específica afetada */
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  /** Alterações realizadas na entidade (mixed armazena qualquer tipo de dado) */
  changes: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  /** Data e hora da ação */
  timestamp: {
    type: Date,
    default: Date.now
  },
  /** Usuário que realizou a ação */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export const Log = mongoose.model('Log', logSchema); 