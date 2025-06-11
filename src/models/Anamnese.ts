import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura da anamnese
 */
export interface IAnamnese extends Document {
  /** Referência ao fonoaudiólogo que realizou a anamnese */
  fono: mongoose.Types.ObjectId;      
  /** Referência ao paciente */
  user: mongoose.Types.ObjectId;      
  /** Conteúdo da anamnese */
  anamnese: string;                   
  /** Data de criação do registro */
  created_at: Date;
  /** Data da última atualização */
  updated_at: Date;
}

/**
 * Schema do MongoDB para a anamnese
 * Define a estrutura e validações dos dados
 */
const AnamneseSchema: Schema = new Schema({
  fono: { type: Schema.Types.ObjectId, ref: 'Therapist', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  anamnese: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IAnamnese>('Anamnese', AnamneseSchema);
