import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapist extends Document {
  userId: mongoose.Types.ObjectId;
  crfa: string;
}

const TherapistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crfa: { type: String, required: true }
});

export default mongoose.model<ITherapist>('Therapist', TherapistSchema);
