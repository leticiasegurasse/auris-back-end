/**
 * Controlador que gerencia as operações relacionadas aos exercícios dos pacientes
 * Responsável por criar, buscar, atualizar e avaliar exercícios atribuídos aos pacientes
 */
import { Request, Response } from 'express';
import { getBucket } from '../utils/gridfs';
import { PatientExerciseBusiness } from '../business/PatientExerciseBusiness';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class PatientExerciseController {
    /**
     * Cria um novo exercício para um paciente
     * @param req - Requisição contendo os dados do exercício (patientId, exerciseId, status, etc)
     * @param res - Resposta HTTP
     * @returns Exercício criado ou erro
     */
    static async create(req: AuthenticatedRequest, res: Response) {
        try {
          const {
            patientId,
            exerciseId,
            status,
            patientComment,
            responseDate,
            startDate,
            endDate
          } = req.body;
      
          const data = {
            patientId,
            exerciseId,
            status,
            patientComment,
            responseDate,
            startDate,
            endDate
          };
      
          const created = await PatientExerciseBusiness.create(data);
          res.status(201).json(created);
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
    }
      

  /**
   * Busca todos os exercícios de um paciente logado
   * @param req - Requisição contendo o ID do paciente no token
   * @param res - Resposta HTTP
   * @returns Lista de exercícios com URLs dos áudios
   */
  static async getAllByPatient(req: AuthenticatedRequest, res: Response) {
    try {
      const patientId = req.user?.id;
      const result = await PatientExerciseBusiness.getAllByPatient(patientId);
      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const response = result.map((item: any) => ({
        ...item.toObject(),
        audioUrl: `${baseUrl}/patient-exercises/audio/${item.audioResponse}`
      }));

      res.json(response);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza um exercício existente
   * @param req - Requisição contendo o ID do exercício e novos dados
   * @param res - Resposta HTTP
   * @returns Exercício atualizado ou erro
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        status,
        patientComment,
        responseDate,
        startDate,
        endDate,
        therapistReview
      } = req.body;
  
      const updated = await PatientExerciseBusiness.update(id, {
        status,
        patientComment,
        responseDate,
        startDate,
        endDate,
        therapistReview
      });
  
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  
  
  /**
   * Busca todos os exercícios de um paciente específico
   * @param req - Requisição contendo o ID do paciente
   * @param res - Resposta HTTP
   * @returns Lista de exercícios com URLs dos áudios
   */
  static async getAllByPatientId(req: AuthenticatedRequest, res: Response) {
    try {
      const { patientId } = req.params;
      const result = await PatientExerciseBusiness.getAllByPatient(patientId);
      const baseUrl = `${req.protocol}://${req.get('host')}`;
  
      const response = result.map((item: any) => ({
        ...item.toObject(),
        audioUrl: item.audioResponse ? `${baseUrl}/patient-exercises/audio/${item.audioResponse}` : null
      }));
  
      res.json(response);
    } catch (error: any) {
      console.error('[GET PATIENT EXERCISES ERROR]', error);
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Exclui um exercício pendente
   * @param req - Requisição contendo o ID do exercício
   * @param res - Resposta HTTP
   * @returns Mensagem de sucesso ou erro
   */
  static async deleteIfPending(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await PatientExerciseBusiness.deleteIfPending(id);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
