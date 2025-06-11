import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura da resposta do paciente
 */
export interface IPatientResponse extends Document {
  patientExerciseId: mongoose.Types.ObjectId;
  audioResponse: string;
  patientComment: string;
  responseDate: Date;
}

/**
 * Schema do MongoDB para a resposta do paciente
 * Define a estrutura e validações dos dados
 */
const PatientResponseSchema: Schema = new Schema({
  patientExerciseId: { type: Schema.Types.ObjectId, ref: 'PatientExercise', required: true },
  audioResponse: { type: String },
  patientComment: { type: String },
  responseDate: { type: Date, default: Date.now }
});

/* 
 * Modelo do MongoDB para a resposta do paciente
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<IPatientResponse>('PatientResponse', PatientResponseSchema);
