/**
 * Serviço que faz as operações diretas no banco de dados dos fonoaudiólogos
 * É aqui que salvamos, buscamos e atualizamos as informações dos fonoaudiólogos
 */
import Therapist, { ITherapist } from '../models/Therapist';
import mongoose from 'mongoose';
import User from '../models/User';
import { createStripeCustomer, cancelSubscription } from '../utils/stripe';

export class TherapistService {
  static async createTherapist(userId: string, crfa: string): Promise<ITherapist> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const customer = await createStripeCustomer({
      email: user.email,
      name: user.name_user,
    });

    console.log(customer.id);
    
    const objectId = new mongoose.Types.ObjectId(userId);
    return Therapist.create({ 
      userId: objectId, 
      crfa,
      stripeCustomerId: customer.id 
    });
  }
  
  /**
   * Busca um fonoaudiólogo pelo seu ID
   * @param id - ID do fonoaudiólogo
   * @returns Os dados do fonoaudiólogo com suas informações de usuário
   */
  static async getTherapistById(id: string): Promise<ITherapist | null> {
    return Therapist.findById(id).populate('userId');
  }

  /**
   * Busca um fonoaudiólogo pelo ID do usuário
   * @param userId - ID do usuário
   * @returns Os dados do fonoaudiólogo com suas informações de usuário e dados do Stripe
   */
  static async getTherapistByUserId(userId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('userId')
      .select('+stripeCustomerId +stripeSubscriptionId +stripeSubscriptionStatus');
  }

  /**
   * Busca um fonoaudiólogo pelo ID do cliente no Stripe
   * @param customerId - ID do cliente no Stripe
   * @returns Os dados do fonoaudiólogo com suas informações de usuário
   */
  static async getTherapistByStripeCustomerId(customerId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ stripeCustomerId: customerId }).populate('userId');
  }

  /**
   * Busca um fonoaudiólogo pelo ID da assinatura no Stripe
   * @param subscriptionId - ID da assinatura no Stripe
   * @returns Os dados do fonoaudiólogo com suas informações de usuário
   */
  static async getTherapistBySubscriptionId(subscriptionId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ stripeSubscriptionId: subscriptionId }).populate('userId');
  }

  /**
   * Atualiza os dados de um fonoaudiólogo
   * @param id - ID do fonoaudiólogo
   * @param updates - Novos dados do fonoaudiólogo
   * @returns Os dados atualizados do fonoaudiólogo
   */
  static async updateTherapist(id: string, updates: Partial<ITherapist>): Promise<ITherapist | null> {
    return Therapist.findByIdAndUpdate(id, updates, { new: true });
  }

  /**
   * Busca todos os fonoaudiólogos
   * @returns Lista com todos os fonoaudiólogos e suas informações de usuário
   */
  static async getAllTherapists(): Promise<ITherapist[]> {
    return Therapist.find().populate('userId');
  }

  static async cancelSubscription(therapistId: string): Promise<ITherapist | null> {
    const therapist = await this.getTherapistById(therapistId);
    if (!therapist) {
      throw new Error('Terapeuta não encontrado');
    }

    if (!therapist.stripeSubscriptionId) {
      throw new Error('Terapeuta não possui assinatura ativa');
    }

    await cancelSubscription(therapist.stripeSubscriptionId);

    console.log(therapist.stripeSubscriptionId);
    
    return this.updateTherapist(therapistId, {
      stripeSubscriptionStatus: 'canceled'
    });
  }
}
