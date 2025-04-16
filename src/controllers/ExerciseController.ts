import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { ExerciseBusiness } from '../business/ExerciseBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class ExerciseController {
  static async create(req: AuthenticatedRequest, res: Response) {
    try {
      const { title, description, instructions } = req.body;
      const file = req.file;
      const therapistId = req.user?.id;

      if (!file) throw new Error('Audio file is required');

      // Salva o arquivo no GridFS
      const bucket = getBucket();
      const filename = `${Date.now()}-${file.originalname}`;
      const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.mimetype
      });
  
      const fileId = uploadStream.id; // <- correto!
  
      uploadStream.end(file.buffer);
  
      uploadStream.on('finish', async () => {
      const exercise = await ExerciseBusiness.create({
          title,
          description,
          instructions,
          therapistId,
          audioReference: fileId.toString(), // usa o ID corretamente
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

  static async getAllByTherapist(req: AuthenticatedRequest, res: Response) {
    try {
      const therapistId = req.user?.id;
      const exercises = await ExerciseBusiness.getAllByTherapist(therapistId);
  
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
      const { title, description, instructions } = req.body;
      const { id } = req.params;
      const file = req.file;
  
      let audioReference: string | undefined;
  
      if (file) {
        // Se houver novo áudio, salva no GridFS
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
        ...(audioReference && { audioReference }),
      });
  
      res.json(updatedExercise);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  
}
