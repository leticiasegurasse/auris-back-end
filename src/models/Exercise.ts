import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do exercício
 */
export interface IExercise extends Document {
  /** Título do exercício */
  title: string;
  /** Descrição detalhada do exercício */
  description: string;
  /** Instruções de execução do exercício */
  instructions: string;
  /** Referência à categoria do exercício */
  categoryId: mongoose.Types.ObjectId;
  /** Referência ao áudio do exercício */
  audioReference: mongoose.Types.ObjectId;
}

/**
 * Schema do MongoDB para o exercício
 * Define a estrutura e validações dos dados
 */
const ExerciseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  instructions: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  audioReference: { type: Schema.Types.ObjectId }
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);
