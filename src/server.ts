// src/server.ts
import express, { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from './database';
import { connectToGridFS } from './utils/gridfs';
import authRoutes from './routes/auth.routes';
import therapistRoutes from './routes/therapist.routes';
import patientRoutes from './routes/patient.routes';
import exerciseRoutes from './routes/exercise.routes';
import anamnese from './routes/anamnese.routes';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/therapists', therapistRoutes);
app.use('/patients', patientRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/anamnese', anamnese);

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[UPLOAD ERROR]', err);
  res.status(500).json({ message: 'Erro interno no upload', details: err.message });
});

connectToDatabase();
connectToGridFS();

export default app;
