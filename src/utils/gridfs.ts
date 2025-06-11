// Importações necessárias para o GridFS
import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Configuração da URI do MongoDB e nome do banco de dados
const mongoUri = process.env.MONGODB_URI as string;
const dbName = 'test'; 

// Variável que armazenará a instância do bucket do GridFS
let bucket: GridFSBucket;

// Função para conectar ao GridFS e inicializar o bucket
export const connectToGridFS = async () => {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  bucket = new GridFSBucket(db, { bucketName: 'fs' });

  console.log('🎉 GridFS conectado');
};

// Função para obter a instância do bucket do GridFS
// Lança erro se o GridFS não estiver conectado
export const getBucket = () => {
  if (!bucket) {
    throw new Error('GridFS não está conectado. Chame connectToGridFS() antes.');
  }
  return bucket;
};

