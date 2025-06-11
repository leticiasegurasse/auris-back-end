import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do paciente
 */
export interface IPatient extends Document {
  /** Referência ao usuário associado ao paciente */
  userId: mongoose.Types.ObjectId;
  /** Referência ao fonoaudiólogo responsável */
  therapistId: mongoose.Types.ObjectId;
  /** Data de nascimento do paciente */
  birthDate: Date;
  /** Diagnóstico do paciente */
  diagnosis: string;
  /** Cidade do paciente */
  city: string;
  /** Observações sobre o paciente */
  notes: string;
  /** Status do paciente no sistema */
  status: string;
  /** Data de cadastro do paciente */
  createdAt: Date;
}

/**
 * Schema do MongoDB para o paciente
 * Define a estrutura e validações dos dados
 */
const PatientSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  birthDate: { type: Date, required: true },
  diagnosis: { type: String },
  city: { type: String },
  notes: { type: String },
  status: { type: String, default: "Ativo" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
