import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do relatório do paciente
 */
export interface IPatientReport extends Document {
  /** Referência ao usuário (profissional) que criou o relatório */
  userId: mongoose.Types.ObjectId;
  /** Referência ao paciente */
  patientId: mongoose.Types.ObjectId;
  /** Tipo do relatório (anamnese ou evolução) */
  type: 'anamnese' | 'evolucao';
  /** Conteúdo principal do relatório */
  report: string;
  /** Observações adicionais */
  observation: string;
  /** Data de criação do relatório */
  createdAt: Date;
}

/**
 * Schema do MongoDB para o relatório do paciente
 * Define a estrutura e validações dos dados
 */
const PatientReportSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  type: { 
    type: String, 
    enum: ['anamnese', 'evolucao'],
    required: true 
  },
  report: { type: String },
  observation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

/* 
 * Modelo do MongoDB para o relatório do paciente
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<IPatientReport>('PatientReport', PatientReportSchema);
