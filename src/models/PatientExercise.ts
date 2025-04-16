import mongoose, { Schema, Document } from 'mongoose';

interface ITherapistReview {
  therapistComment: string;
  therapistFeedback: string;
  score: number;
  createdAt: Date;
}

export interface IPatientExercise extends Document {
  patientId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  status: string;
  patientComment: string;
  responseDate: Date;
  startDate: Date;
  endDate: Date;
  therapistReview?: ITherapistReview;
}

const TherapistReviewSchema: Schema = new Schema({
  therapistComment: { type: String },
  therapistFeedback: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const PatientExerciseSchema: Schema = new Schema({
  patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  status: { type: String },
  patientComment: { type: String },
  responseDate: { type: Date },
  startDate: { type: Date },
  endDate: { type: Date },
  therapistReview: TherapistReviewSchema
});

export default mongoose.model<IPatientExercise>('PatientExercise', PatientExerciseSchema);
