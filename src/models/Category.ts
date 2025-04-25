import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  title: string;
  description: string;
  therapistId: mongoose.Types.ObjectId;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  therapistId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
