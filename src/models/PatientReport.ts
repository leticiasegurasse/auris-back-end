import mongoose, { Schema, Document } from 'mongoose';

export interface IPatientReport extends Document {
  userId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  type: 'anamnese' | 'evolucao';
  report: string;
  observation: string;
  createdAt: Date;
}

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

export default mongoose.model<IPatientReport>('PatientReport', PatientReportSchema);
