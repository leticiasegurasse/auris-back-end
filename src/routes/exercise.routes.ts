import express from 'express';
import multer from 'multer';
import { ExerciseController } from '../controllers/ExerciseController';
import { authMiddleware } from '../middlewares/auth.middleware';
import { getBucket } from '../utils/gridfs';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Armazena o arquivo na memória (buffer)
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authMiddleware, upload.single('file'), ExerciseController.create);
router.get('/category/:categoryId', authMiddleware, ExerciseController.getAllByCategory);
router.get('/audio/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bucket = getBucket();
      const _id = new ObjectId(id);
  
      const downloadStream = bucket.openDownloadStream(_id);
  
      res.set('Content-Type', 'audio/mpeg'); // ajuste o tipo conforme necessário
      downloadStream.pipe(res);
  
      downloadStream.on('error', (err) => {
        console.error('Erro ao baixar áudio:', err);
        res.status(404).json({ message: 'Áudio não encontrado' });
      });
    } catch (err) {
      res.status(400).json({ message: 'ID inválido' });
    }
});
router.get('/:id', authMiddleware, ExerciseController.getById);
router.put('/:id', authMiddleware, upload.single('file'), ExerciseController.update);

export default router;
