import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura da avaliação do fonoaudiólogo
 */
export interface ITherapistEvaluation extends Document {
  /** Referência à resposta do paciente que está sendo avaliada */
  patientResponseId: mongoose.Types.ObjectId;
  /** Comentário do fonoaudiólogo sobre a resposta */
  therapistComment: string;
  /** Feedback detalhado do fonoaudiólogo */
  therapistFeedback: string;
  /** Pontuação atribuída à resposta */
  score: number;
  /** Data de criação da avaliação */
  createdAt: Date;
}

/**
 * Schema do MongoDB para a avaliação do fonoaudiólogo
 * Define a estrutura e validações dos dados
 */
const TherapistEvaluationSchema: Schema = new Schema({
  patientResponseId: { type: Schema.Types.ObjectId, ref: 'PatientResponse', required: true },
  therapistComment: { type: String },
  therapistFeedback: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

/* 
 * Modelo do MongoDB para a avaliação do fonoaudiólogo
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<ITherapistEvaluation>('TherapistEvaluation', TherapistEvaluationSchema);
