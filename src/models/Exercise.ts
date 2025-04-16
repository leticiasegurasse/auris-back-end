import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  description: string;
  instructions: string;
  therapistId: mongoose.Types.ObjectId;
  audioReference: mongoose.Types.ObjectId;
}

const ExerciseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructions: { type: String },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  audioReference: { type: Schema.Types.ObjectId }
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
