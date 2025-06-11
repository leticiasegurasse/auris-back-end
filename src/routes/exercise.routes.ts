/**
 * Rotas de Exercícios
 * Este arquivo contém as rotas para gerenciamento de exercícios fonoaudiológicos,
 * incluindo criação, atualização, listagem e exclusão de exercícios,
 * além de funcionalidades específicas como busca por categoria e atribuição a pacientes
 */
import express from 'express';
import multer from 'multer';
import { ExerciseController } from '../controllers/ExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';
import { getBucket } from '../utils/gridfs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Configuração para upload de arquivos
const upload = multer({ storage: multer.memoryStorage() });

// Cria um novo exercício com arquivo de áudio
router.post('/', authMiddleware, upload.single('file'), LoggingMiddleware('Exercise'), ExerciseController.create);

// Lista exercícios por categoria
router.get('/category/:categoryId', authMiddleware, ExerciseController.getAllByCategory);

// Obtém o arquivo de áudio de um exercício
router.get('/audio/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bucket = getBucket(); //API do MongoDB que permite fazer upload e download de arquivos grandes
      const _id = new ObjectId(id); //Converte o ID do exercício para um ObjectId do MongoDB
  
      const downloadStream = bucket.openDownloadStream(_id); //Abre um stream de download do arquivo
  
      res.set('Content-Type', 'audio/mpeg'); //Define o tipo de conteúdo da resposta
      downloadStream.pipe(res); //Envia o arquivo para o cliente
  
      downloadStream.on('error', (err) => { //Gerencia erros
        console.error('Erro ao baixar áudio:', err);
        res.status(404).json({ message: 'Áudio não encontrado' });
      });
    } catch (err) {
      res.status(400).json({ message: 'ID inválido' });
    }
});

// Busca um exercício específico pelo ID
router.get('/:id', authMiddleware, ExerciseController.getById);

// Atualiza um exercício existente com novo áudio
router.put('/:id', authMiddleware, upload.single('file'), LoggingMiddleware('Exercise'), ExerciseController.update);

// Remove um exercício
router.delete('/:id', authMiddleware, LoggingMiddleware('Exercise'), ExerciseController.delete);

export default router;
