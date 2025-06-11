import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do plano de assinatura do usuário
 */
export interface IUserPlan extends Document {
  /** ID da assinatura no Stripe */
  stripe_subscription_id: string;
  /** Status do pagamento da assinatura */
  payment_status: 'pago' | 'pendente' | 'falhou';
  /** Data de criação do registro */
  created_at: Date;
  /** Data da última atualização */
  updated_at: Date;
}

/**
 * Schema do MongoDB para o plano de assinatura
 * Define a estrutura e validações dos dados
 */
const UserPlanSchema: Schema = new Schema({
  stripe_subscription_id: { type: String, required: true, unique: true },
  payment_status: { 
    type: String, 
    required: true,
    enum: ['pago', 'pendente', 'falhou'],
    default: 'pendente'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/* 
 * Modelo do MongoDB para o plano de assinatura
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<IUserPlan>('UserPlan', UserPlanSchema); 