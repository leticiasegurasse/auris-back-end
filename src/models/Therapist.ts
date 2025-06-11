import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do fonoaudiólogo
 */
export interface ITherapist extends Document {
  /** Referência ao usuário associado ao fonoaudiólogo */
  userId: mongoose.Types.ObjectId;
  /** Número do registro profissional do fonoaudiólogo */
  crfa: string;

  /** Status da assinatura no Stripe */
  stripeSubscriptionStatus: string;
  /** ID do cliente no Stripe */
  stripeCustomerId: string;
  /** ID da assinatura no Stripe */
  stripeSubscriptionId: string;
}

/**
 * Schema do MongoDB para o fonoaudiólogo
 * Define a estrutura e validações dos dados
 */
const TherapistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crfa: { type: String, required: true },
  stripeSubscriptionStatus: { type: String },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String }
});

/* 
 * Modelo do MongoDB para o fonoaudiólogo
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<ITherapist>('Therapist', TherapistSchema);
