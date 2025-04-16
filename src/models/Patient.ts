import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  therapistId: mongoose.Types.ObjectId;
  birthDate: Date;
  diagnosis: string;
  createdAt: Date;
}

const PatientSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  birthDate: { type: Date, required: true },
  diagnosis: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPatient>('Patient', PatientSchema);
