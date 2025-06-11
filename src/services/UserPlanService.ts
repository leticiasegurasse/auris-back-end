/**
 * Serviço que faz as operações diretas no banco de dados dos planos de assinatura dos usuários
 * Responsável por criar e atualizar os planos de assinatura no MongoDB
 */
import UserPlan, { IUserPlan } from '../models/UserPlan';

/**
 * Interface que define os dados necessários para criar um plano de usuário
 */
interface CreateUserPlanDTO {
  /** ID da assinatura no Stripe */
  stripe_subscription_id: string;
  /** Status do pagamento da assinatura */
  payment_status: 'pago' | 'pendente' | 'falhou';
}

export class UserPlanService {
  /**
   * Cria um novo plano de assinatura para um usuário
   * @param data - Dados do plano (ID da assinatura e status do pagamento)
   * @returns Plano de assinatura criado
   */
  static async createUserPlan(data: CreateUserPlanDTO): Promise<IUserPlan> {
    return UserPlan.create(data);
  }

  /**
   * Busca um plano de assinatura pelo ID da assinatura no Stripe
   * @param subscriptionId - ID da assinatura no Stripe
   * @returns Plano de assinatura encontrado ou null
   */
  static async getUserPlanBySubscriptionId(subscriptionId: string): Promise<IUserPlan | null> {
    return UserPlan.findOne({ stripe_subscription_id: subscriptionId });
  }

  /**
   * Atualiza o status de pagamento de um plano de assinatura
   * @param subscriptionId - ID da assinatura no Stripe
   * @param status - Novo status do pagamento
   * @returns Plano de assinatura atualizado ou null
   */
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