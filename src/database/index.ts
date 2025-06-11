/**
 * Configuração e conexão com o banco de dados MongoDB
 * Responsável por estabelecer a conexão com o banco de dados usando Mongoose
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Estabelece conexão com o banco de dados MongoDB
 * @throws Erro se a variável MONGODB_URI não estiver definida
 * @throws Erro se não conseguir conectar ao MongoDB
 * @returns Promise que resolve quando a conexão for estabelecida
 */
export async function connectToDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error('❌ MONGODB_URI não foi definida no arquivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('🟢 Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB', error);
    process.exit(1);
  }
}
