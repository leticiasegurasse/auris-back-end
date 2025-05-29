import express, { Request, Response, NextFunction } from 'express';
import { connectToDatabase } from './database';
import { connectToGridFS } from './utils/gridfs';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import therapistRoutes from './routes/therapist.routes';
import patientRoutes from './routes/patient.routes';
import exerciseRoutes from './routes/exercise.routes';
import categoryRoutes from './routes/category.routes';
import patientReportRoutes from './routes/patientReport.routes';
import therapistEvaluationRoutes from './routes/therapistEvaluation.routes';
import patientExerciseRoutes from './routes/patientExercise.routes';
import patientResponseRoutes from './routes/patientResponse.routes';
import messageRoutes from './routes/message.routes';
import agendaRoutes from './routes/agenda.routes';
import anamneseRoutes from './routes/anamnese.routes';
import logRoutes from './routes/logRoutes';
import checkoutRoutes from './routes/checkoutRoutes';
import cors from 'cors';
import stripeWebhook from './webhook/stripeWebhook';
import invoiceRoutes from './routes/invoice.routes';

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

app.use(cors(corsOptions));

// IMPORTANTE: O webhook do Stripe deve ser registrado ANTES do express.json()
// porque ele precisa do body raw para validar a assinatura
app.use('/stripeWebhook', stripeWebhook);

// Middleware de parsing JSON deve vir DEPOIS do webhook
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/therapists', therapistRoutes);
app.use('/patients', patientRoutes);
app.use('/exercises', exerciseRoutes);
app.use('/patient-reports', patientReportRoutes);
app.use('/therapist-evaluations', therapistEvaluationRoutes);
app.use('/patient-exercises', patientExerciseRoutes);
app.use('/patient-responses', patientResponseRoutes);
app.use('/messages', messageRoutes);
app.use('/agenda', agendaRoutes);
app.use('/anamnese', anamneseRoutes);
app.use('/categories', categoryRoutes);
app.use('/', logRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/invoices', invoiceRoutes);

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
