/**
 * Rotas de Respostas do Paciente
 * Este arquivo contém as rotas para gerenciamento das respostas dos pacientes aos exercícios.
 */
import express, { RequestHandler } from 'express';
//multer é um middleware do Express que serve para tratar envio de arquivos via requisições HTTP do tipo multipart/form-data
import multer from 'multer';
import { PatientResponseController } from '../controllers/PatientResponseController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { cacheMiddleware } from '../middlewares/cache.middleware';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Cria uma nova resposta do paciente com áudio
router.post('/', authMiddleware, upload.single('audio'), PatientResponseController.create);

// Lista todas as respostas do paciente
router.get('/', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientResponseController.getAll);

// Busca uma resposta específica pelo ID
router.get('/:id', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientResponseController.getById);

// Atualiza uma resposta existente com novo áudio
router.put('/:id', authMiddleware, upload.single('audio'), PatientResponseController.update);

// Obtém o arquivo de áudio de uma resposta
router.get('/audio/:id', PatientResponseController.getAudio);

// Busca respostas relacionadas a um exercício específico do paciente
router.get('/exercise/:patientExerciseId', authMiddleware, cacheMiddleware(300) as RequestHandler, PatientResponseController.getByPatientExerciseId);

export default router;
