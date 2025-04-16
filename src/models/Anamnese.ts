import mongoose, { Schema, Document } from 'mongoose';

export interface IAnamnese extends Document {
  fono: mongoose.Types.ObjectId;      
  user: mongoose.Types.ObjectId;      
  anamnese: string;                   
  created_at: Date;
  updated_at: Date;
}

const AnamneseSchema: Schema = new Schema({
  fono: { type: Schema.Types.ObjectId, ref: 'Therapist', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  anamnese: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model<IAnamnese>('Anamnese', AnamneseSchema);
