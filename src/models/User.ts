import mongoose, { Schema, Document } from 'mongoose';

/**
 * Interface que define a estrutura do usuário
 */
export interface IUser extends Document {
    /** Nome completo do usuário */
    name_user: string;
    /** Email do usuário */
    email: string;
    /** Senha criptografada do usuário */
    password: string;
    /** Papel do usuário no sistema (fonoaudiólogo/paciente) */
    role: string;
    /** Número do registro profissional (apenas para fonoaudiólogos) */
    crfa: string;
    /** Data de criação do registro */
    created_at: Date;
    /** Data da última atualização */
    updated_at: Date;
}

/**
 * Schema do MongoDB para o usuário
 * Define a estrutura e validações dos dados
 */
const UserSchema: Schema = new Schema({
    name_user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    crfa: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

/* 
 * Modelo do MongoDB para o usuário
 * Exporta o modelo para ser usado em outros arquivos
 */
export default mongoose.model<IUser>('User', UserSchema);
