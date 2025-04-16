import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { ObjectId } from 'mongodb';
import { PatientResponseBusiness } from '../business/PatientResponseBusiness';

export class PatientResponseController {
  static async create(req: Request, res: Response) {
    try {
      const { patientExerciseId, patientComment, responseDate } = req.body;
      const file = req.file;

      if (!file) throw new Error('Audio file is required');

      const bucket = getBucket();
      const filename = `${Date.now()}-${file.originalname}`;
      const uploadStream = bucket.openUploadStream(filename, {
        contentType: file.mimetype
      });

      const fileId = uploadStream.id;
      uploadStream.end(file.buffer);

      await new Promise<void>((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });

      const data = {
        patientExerciseId,
        patientComment,
        responseDate,
        audioResponse: fileId.toString()
      };

      const created = await PatientResponseBusiness.create(data);
      res.status(201).json(created);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const responses = await PatientResponseBusiness.getAll();
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      const responseWithUrl = responses.map((r: any) => ({
        ...r.toObject(),
        audioUrl: `${baseUrl}/patient-responses/audio/${r.audioResponse}`
      }));
      res.json(responseWithUrl);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await PatientResponseBusiness.getById(id);
      res.json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { patientComment, responseDate } = req.body;
      const file = req.file;

      let audioResponse: string | undefined;

      if (file) {
        const bucket = getBucket();
        const filename = `${Date.now()}-${file.originalname}`;
        const uploadStream = bucket.openUploadStream(filename, {
          contentType: file.mimetype
        });

        const fileId = uploadStream.id;
        uploadStream.end(file.buffer);

        await new Promise<void>((resolve, reject) => {
          uploadStream.on('finish', resolve);
          uploadStream.on('error', reject);
        });

        audioResponse = fileId.toString();
      }

      const updated = await PatientResponseBusiness.update(id, {
        patientComment,
        responseDate,
        ...(audioResponse && { audioResponse })
      });

      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getAudio(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bucket = getBucket();
      const _id = new ObjectId(id);

      const stream = bucket.openDownloadStream(_id);

      res.set('Content-Type', 'audio/mpeg');
      stream.pipe(res);

      stream.on('error', (err) => {
        res.status(404).json({ message: 'Áudio não encontrado' });
      });
    } catch {
      res.status(400).json({ message: 'ID inválido' });
    }
  }
}
