import mongoose, { Schema, Document } from 'mongoose';

export interface IPatientResponse extends Document {
  patientExerciseId: mongoose.Types.ObjectId;
  audioResponse: string;
  patientComment: string;
  responseDate: Date;
}

const PatientResponseSchema: Schema = new Schema({
  patientExerciseId: { type: Schema.Types.ObjectId, ref: 'PatientExercise', required: true },
  audioResponse: { type: String },
  patientComment: { type: String },
  responseDate: { type: Date, default: Date.now }
});

export default mongoose.model<IPatientResponse>('PatientResponse', PatientResponseSchema);
