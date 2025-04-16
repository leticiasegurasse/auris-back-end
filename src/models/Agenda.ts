import mongoose, { Schema, Document } from 'mongoose';

export interface IAgenda extends Document {
  patient: mongoose.Types.ObjectId;       
  therapist: mongoose.Types.ObjectId;    
  consultationDateTime: Date;             
  specialty: string;                      
  observations?: string;                  
  created_at: Date;
  updated_at: Date;
}

const AgendaSchema: Schema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  therapist: { type: Schema.Types.ObjectId, ref: 'Therapist', required: true },
  consultationDateTime: { type: Date, required: true },
  specialty: { type: String, default: 'Fonoaudiologia' },
  observations: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IAgenda>('Agenda', AgendaSchema);
