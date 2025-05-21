import mongoose, { Schema, Document } from 'mongoose';

export interface ITherapist extends Document {
  userId: mongoose.Types.ObjectId;
  crfa: string;

  stripeSubscriptionStatus: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}

const TherapistSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  crfa: { type: String, required: true },
  stripeSubscriptionStatus: { type: String },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String }
});

export default mongoose.model<ITherapist>('Therapist', TherapistSchema);
