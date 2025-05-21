import UserPlan, { IUserPlan } from '../models/UserPlan';

interface CreateUserPlanDTO {
  stripe_subscription_id: string;
  payment_status: 'pago' | 'pendente' | 'falhou';
}

export class UserPlanService {
  static async createUserPlan(data: CreateUserPlanDTO): Promise<IUserPlan> {
    return UserPlan.create(data);
  }

  static async getUserPlanBySubscriptionId(subscriptionId: string): Promise<IUserPlan | null> {
    return UserPlan.findOne({ stripe_subscription_id: subscriptionId });
  }

  static async updateUserPlanPaymentStatus(subscriptionId: string, status: 'pago' | 'pendente' | 'falhou'): Promise<IUserPlan | null> {
    return UserPlan.findOneAndUpdate(
      { stripe_subscription_id: subscriptionId },
      { 
        payment_status: status,
        updated_at: new Date()
      },
      { new: true }
    );
  }
}

export const userPlanService = new UserPlanService();
export const updateUserPlanPaymentStatus = UserPlanService.updateUserPlanPaymentStatus; 