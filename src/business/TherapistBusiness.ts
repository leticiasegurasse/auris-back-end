/**
 * Classe que cuida das regras de negócio dos fonoaudiólogos
 * É aqui que verificamos se tudo está correto antes de fazer as operações
 */
import { TherapistService } from '../services/TherapistService';
import { ITherapist } from '../models/Therapist';

export class TherapistBusiness {
  /**
   * Busca um fonoaudiólogo pelo seu ID
   * @param id - ID do fonoaudiólogo
   * @returns Os dados do fonoaudiólogo
   * @throws Erro se o fonoaudiólogo não for encontrado
   */
  static async getById(id: string): Promise<ITherapist> {
    const therapist = await TherapistService.getTherapistById(id);
    if (!therapist) throw new Error('Therapist not found');
    return therapist;
  }

  /**
   * Atualiza os dados de um fonoaudiólogo
   * @param id - ID do fonoaudiólogo
   * @param data - Novos dados do fonoaudiólogo
   * @returns Os dados atualizados do fonoaudiólogo
   * @throws Erro se não conseguir atualizar
   */
  static async update(id: string, data: Partial<ITherapist>): Promise<ITherapist> {
    const updated = await TherapistService.updateTherapist(id, data);
    if (!updated) throw new Error('Failed to update therapist');
    return updated;
  }

  /**
   * Busca todos os fonoaudiólogos
   * @returns Lista com todos os fonoaudiólogos
   */
  static async getAll(): Promise<ITherapist[]> {
    return TherapistService.getAllTherapists();
  }

  /**
   * Cancela a assinatura de um fonoaudiólogo
   * @param id - ID do fonoaudiólogo
   * @returns Os dados do fonoaudiólogo com a assinatura cancelada
   * @throws Erro se não conseguir cancelar a assinatura
   */
  static async cancelSubscription(id: string): Promise<ITherapist> {
    const therapist = await TherapistService.cancelSubscription(id);
    if (!therapist) throw new Error('Failed to cancel subscription');
    return therapist;
  }
}
