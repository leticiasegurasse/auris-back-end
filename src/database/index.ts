import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

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
