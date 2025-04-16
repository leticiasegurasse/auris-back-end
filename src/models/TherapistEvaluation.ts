import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapistEvaluation extends Document {
  patientResponseId: mongoose.Types.ObjectId;
  therapistComment: string;
  therapistFeedback: string;
  score: number;
  createdAt: Date;
}

const TherapistEvaluationSchema: Schema = new Schema({
  patientResponseId: { type: Schema.Types.ObjectId, ref: 'PatientResponse', required: true },
  therapistComment: { type: String },
  therapistFeedback: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITherapistEvaluation>('TherapistEvaluation', TherapistEvaluationSchema);
