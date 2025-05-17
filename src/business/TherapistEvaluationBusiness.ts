import { TherapistEvaluationService } from '../services/TherapistEvaluationService';
import { PatientResponseService } from '../services/PatientResponseService';
import { PatientExerciseService } from '../services/PatientExerciseService';
import { IPatientResponse } from '../models/PatientResponse';
import mongoose from 'mongoose';

export class TherapistEvaluationBusiness {
  static async create(data: any) {
    try {
      // Primeiro, buscar o PatientResponse para obter o PatientExercise vinculado
      const patientResponse = await PatientResponseService.getById(data.patientResponseId) as IPatientResponse;
      if (!patientResponse) {
        throw new Error('Resposta do paciente não encontrada');
      }

      // Extrair o ID do PatientExercise do objeto populado
      const patientExerciseId = patientResponse.patientExerciseId._id || patientResponse.patientExerciseId;
      if (!patientExerciseId) {
        throw new Error('ID do exercício do paciente não encontrado');
      }

      // Atualizar o status do PatientExercise para completed
      await PatientExerciseService.update(patientExerciseId.toString(), {
        status: 'completed'
      });

      // Criar a avaliação do terapeuta
      return TherapistEvaluationService.create(data);
    } catch (error: any) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  }

  static async getAll() {
    return TherapistEvaluationService.getAll();
  }

  static async getById(id: string) {
    return TherapistEvaluationService.getById(id);
  }

  static async update(id: string, data: any) {
    return TherapistEvaluationService.update(id, data);
  }

  static async getByPatientResponseId(patientResponseId: string) {
    return TherapistEvaluationService.getByPatientResponseId(patientResponseId);
  }
}