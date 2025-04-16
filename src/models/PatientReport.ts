import mongoose, { Schema, Document } from 'mongoose';

export interface IPatientReport extends Document {
  userId: mongoose.Types.ObjectId;
  report: string;
  observation: string;
  createdAt: Date;
}

const PatientReportSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  report: { type: String },
  observation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPatientReport>('PatientReport', PatientReportSchema);
