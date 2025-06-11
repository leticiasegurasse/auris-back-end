import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do agendamento
 */
export interface IAgenda extends Document {
  /** Referência ao paciente */
  patient: mongoose.Types.ObjectId;       
  /** Referência ao fonoaudiólogo */
  therapist: mongoose.Types.ObjectId;    
  /** Data e hora da consulta */
  consultationDateTime: Date;             
  /** Observações sobre a consulta */
  observations?: string;                  
  /** Data de criação do agendamento */
  created_at: Date;
  /** Data da última atualização */
  updated_at: Date;
}

/**
 * Schema do MongoDB para o agendamento
 * Define a estrutura e validações dos dados
 */
const AgendaSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  therapist: { type: Schema.Types.ObjectId, ref: 'Therapist', required: true },
  consultationDateTime: { type: Date, required: true },
  observations: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IAgenda>('Agenda', AgendaSchema);
