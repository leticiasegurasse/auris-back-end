/**
 * Classe que cuida das regras de negócio das avaliações feitas pelos fonoaudiólogos
 * É aqui que verificamos se tudo está correto antes de criar ou atualizar uma avaliação
 */
import { TherapistEvaluationService } from '../services/TherapistEvaluationService';
import { PatientResponseService } from '../services/PatientResponseService';
import { PatientExerciseService } from '../services/PatientExerciseService';
import { IPatientResponse } from '../models/PatientResponse';
import mongoose from 'mongoose';

export class TherapistEvaluationBusiness {
  /**
   * Cria uma nova avaliação do fonoaudiólogo
   * @param data - Dados da avaliação (comentário, feedback, pontuação e ID da resposta do paciente)
   * @returns A avaliação criada
   * @throws Erro se a resposta do paciente não for encontrada ou se o exercício não existir
   */
  static async create(data: any) {
    try {
      // Busca a resposta do paciente para pegar o exercício relacionado
      const patientResponse = await PatientResponseService.getById(data.patientResponseId) as IPatientResponse;
      if (!patientResponse) {
        throw new Error('Resposta do paciente não encontrada');
      }

      // Pega o ID do exercício do paciente
      const patientExerciseId = patientResponse.patientExerciseId._id || patientResponse.patientExerciseId;
      if (!patientExerciseId) {
        throw new Error('ID do exercício do paciente não encontrado');
      }

      // Marca o exercício como concluído
      await PatientExerciseService.update(patientExerciseId.toString(), {
        status: 'completed'
      });

      // Cria a avaliação
      return TherapistEvaluationService.create(data);
    } catch (error: any) {
      console.error('Erro ao criar avaliação:', error);
      throw error;
    }
  }

  /**
   * Busca todas as avaliações
   * @returns Lista com todas as avaliações
   */
  static async getAll() {
    return TherapistEvaluationService.getAll();
  }

  /**
   * Busca uma avaliação pelo seu ID
   * @param id - ID da avaliação
   * @returns A avaliação encontrada
   */
  static async getById(id: string) {
    return TherapistEvaluationService.getById(id);
  }

  /**
   * Atualiza uma avaliação existente
   * @param id - ID da avaliação
   * @param data - Novos dados da avaliação
   * @returns A avaliação atualizada
   */
  static async update(id: string, data: any) {
    return TherapistEvaluationService.update(id, data);
  }

  /**
   * Busca uma avaliação pelo ID da resposta do paciente
   * @param patientResponseId - ID da resposta do paciente
   * @returns A avaliação encontrada
   */
  static async getByPatientResponseId(patientResponseId: string) {
    return TherapistEvaluationService.getByPatientResponseId(patientResponseId);
  }
}