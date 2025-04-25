import mongoose, { Schema, Document } from 'mongoose';

export interface IExercise extends Document {
  title: string;
  description: string;
  instructions: string;
  categoryId: mongoose.Types.ObjectId;
  audioReference: mongoose.Types.ObjectId;
}

const ExerciseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructions: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  audioReference: { type: Schema.Types.ObjectId }
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
