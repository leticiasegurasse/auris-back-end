import mongoose, { Schema, Document } from 'mongoose';


/**
 * Interface que define a estrutura do exercício do paciente
 */
export interface IPatientExercise extends Document {
  /** Referência ao paciente */
  patientId: mongoose.Types.ObjectId;
  /** Referência ao exercício */
  exerciseId: mongoose.Types.ObjectId;
  /** Data de criação do registro */
  createdAt: Date;
  status: string;
  startDate: Date;
  endDate: Date;
}


/**
 * Schema do MongoDB para o exercício do paciente
 * Define a estrutura e validações dos dados
 */
const PatientExerciseSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
});

export default mongoose.model<IPatientExercise>('PatientExercise', PatientExerciseSchema);
