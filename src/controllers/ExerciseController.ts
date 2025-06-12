/**
 * Controlador que gerencia as operações relacionadas aos exercícios fonoaudiológicos
 * Responsável por criar, buscar, atualizar e excluir exercícios, incluindo o gerenciamento de arquivos de áudio
 */
import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { ExerciseBusiness } from '../business/ExerciseBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import mongoose from 'mongoose';
import { CacheService } from '../services/cache.service';

export class ExerciseController {
  /**
   * Cria um novo exercício com arquivo de áudio
   * @param req - Requisição contendo os dados do exercício e arquivo de áudio
   * @param res - Resposta HTTP
   * @returns Exercício criado ou erro
   */
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
          categoryId: convertedCategoryId,
          audioReference: fileId.toString(),
        });

        // Limpa o cache após criar com sucesso
        await CacheService.getInstance().clear();

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

  /**
   * Busca exercícios por categoria com paginação
   * @param req - Requisição contendo o ID da categoria e parâmetros de paginação
   * @param res - Resposta HTTP
   * @returns Lista paginada de exercícios com URLs dos áudios
   */
  static async getAllByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      if (!categoryId) throw new Error('categoryId is required');

      const result = await ExerciseBusiness.getAllByCategory(categoryId, page, limit);
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const exercisesWithAudioUrl = result.exercises.map((exercise: any) => {
        const obj = exercise.toObject ? exercise.toObject() : exercise;
        return {
          ...obj,
          audioUrl: `${baseUrl}/exercises/audio/${obj.audioReference}`,
        };
      });

      res.json({
        exercises: exercisesWithAudioUrl,
        pagination: result.pagination
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza um exercício existente
   * @param req - Requisição contendo o ID do exercício, novos dados e opcionalmente um novo arquivo de áudio
   * @param res - Resposta HTTP
   * @returns Exercício atualizado ou erro
   */
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

      // Limpa o cache após atualizar com sucesso
      await CacheService.getInstance().clear();

      res.json(updatedExercise);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  /**
   * Busca um exercício pelo seu ID
   * @param req - Requisição contendo o ID do exercício
   * @param res - Resposta HTTP
   * @returns Exercício encontrado ou erro
   */
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
  
  /**
   * Exclui um exercício
   * @param req - Requisição contendo o ID do exercício
   * @param res - Resposta HTTP
   * @returns Mensagem de sucesso ou erro
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ExerciseBusiness.delete(id);
      
      // Limpa o cache após deletar com sucesso
      await CacheService.getInstance().clear();
      
      res.json({ message: 'Exercício excluído com sucesso' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
