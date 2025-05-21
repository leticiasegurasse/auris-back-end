import mongoose, { Schema, Document } from 'mongoose';

export interface IUserPlan extends Document {
  stripe_subscription_id: string;
  payment_status: 'pago' | 'pendente' | 'falhou';
  created_at: Date;
  updated_at: Date;
}

const UserPlanSchema: Schema = new Schema({
  stripe_subscription_id: { type: String, required: true, unique: true },
  payment_status: { 
    type: String, 
    required: true,
    enum: ['pago', 'pendente', 'falhou'],
    default: 'pendente'
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IUserPlan>('UserPlan', UserPlanSchema); 