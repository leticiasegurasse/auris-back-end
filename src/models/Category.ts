import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura da categoria
 */
export interface ICategory extends Document {
  /** Título da categoria */
  title: string;
  /** Descrição da categoria */
  description: string;
  /** Referência ao fonoaudiólogo que criou a categoria */
  therapistId: mongoose.Types.ObjectId;
}

/**
 * Schema do MongoDB para a categoria
 * Define a estrutura e validações dos dados
 */
const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
