import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name_user: string;
    email: string;
    password: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

const UserSchema: Schema = new Schema({
    name_user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
