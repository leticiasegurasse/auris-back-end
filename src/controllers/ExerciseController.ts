import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { ExerciseBusiness } from '../business/ExerciseBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import mongoose from 'mongoose';

export class ExerciseController {
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, instructions, categoryId } = req.body;
      const file = req.file;

      if (!file) throw new Error('Audio file is required');
      if (!categoryId) throw new Error('categoryId is required');

      // Convertendo categoryId para ObjectId
      const convertedCategoryId = new mongoose.Types.ObjectId(categoryId);

      // Salva o arquivo no GridFS
      const bucket = getBucket();
      const filename = `${Date.now()}-${file.originalname}`;
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: file.mimetype
      });

      const fileId = uploadStream.id;
      uploadStream.end(file.buffer);

      uploadStream.on('finish', async () => {
        const exercise = await ExerciseBusiness.create({
          title,
          description,
          instructions,
          categoryId: convertedCategoryId, // 👈 aqui mandando como ObjectId
          audioReference: fileId.toString(),
        });

        res.status(201).json(exercise);
      });

      uploadStream.on('error', (err) => {
        console.error('Erro ao salvar no GridFS:', err);
        res.status(500).json({ message: 'Erro ao salvar áudio', details: err.message });
      });

    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;

      if (!categoryId) throw new Error('categoryId is required');

      const exercises = await ExerciseBusiness.getAllByCategory(categoryId);
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const exercisesWithAudioUrl = exercises.map((exercise: any) => {
        const obj = exercise.toObject ? exercise.toObject() : exercise;
        return {
          ...obj,
          audioUrl: `${baseUrl}/exercises/audio/${obj.audioReference}`,
        };
      });

      res.json(exercisesWithAudioUrl);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, instructions, categoryId } = req.body;
      const { id } = req.params;
      const file = req.file;

      let audioReference: string | undefined;

      if (file) {
        const bucket = getBucket();
        const filename = `${Date.now()}-${file.originalname}`;
        const uploadStream = bucket.openUploadStream(filename, {
          contentType: file.mimetype,
        });

        const fileId = uploadStream.id;
        uploadStream.end(file.buffer);

        await new Promise<void>((resolve, reject) => {
          uploadStream.on('finish', () => {
            audioReference = fileId.toString();
            resolve();
          });
          uploadStream.on('error', reject);
        });
      }

      const updatedExercise = await ExerciseBusiness.update(id, {
        title,
        description,
        instructions,
        ...(categoryId && { categoryId }),
        ...(audioReference && { audioReference }),
      });

      res.json(updatedExercise);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const exercise = await ExerciseBusiness.getById(id);
  
      if (!exercise) {
        res.status(404).json({ message: 'Exercício não encontrado' });
        return;
      }
  
      res.json(exercise);
    } catch (error: any) {
      console.error('[GET EXERCISE BY ID ERROR]', error);
      res.status(400).json({ message: 'Erro ao buscar exercício', details: error.message });
    }
  }
  
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ExerciseBusiness.delete(id);
      res.json({ message: 'Exercício excluído com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
