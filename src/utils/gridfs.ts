import { MongoClient, GridFSBucket } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI as string;
const dbName = 'test'; 

let bucket: GridFSBucket;

export const connectToGridFS = async () => {
  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);
  bucket = new GridFSBucket(db, { bucketName: 'fs' });

  console.log('🎉 GridFS conectado');
};

export const getBucket = () => {
  if (!bucket) {
    throw new Error('GridFS não está conectado. Chame connectToGridFS() antes.');
  }
  return bucket;
};
