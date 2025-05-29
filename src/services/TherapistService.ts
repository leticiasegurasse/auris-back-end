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
  
  static async getTherapistById(id: string): Promise<ITherapist | null> {
    return Therapist.findById(id).populate('userId');
  }

  static async getTherapistByUserId(userId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ userId: new mongoose.Types.ObjectId(userId) })
      .populate('userId')
      .select('+stripeCustomerId +stripeSubscriptionId +stripeSubscriptionStatus');
  }

  static async getTherapistByStripeCustomerId(customerId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ stripeCustomerId: customerId }).populate('userId');
  }

  static async getTherapistBySubscriptionId(subscriptionId: string): Promise<ITherapist | null> {
    return Therapist.findOne({ stripeSubscriptionId: subscriptionId }).populate('userId');
  }

  static async updateTherapist(id: string, updates: Partial<ITherapist>): Promise<ITherapist | null> {
    return Therapist.findByIdAndUpdate(id, updates, { new: true });
  }

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
