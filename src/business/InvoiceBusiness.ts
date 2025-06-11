/**
 * Classe que implementa as regras de negócio relacionadas às faturas
 * Responsável por validar e processar as operações antes de acessar o Stripe
 */
import { getCustomerInvoices } from '../utils/stripe';
import { TherapistService } from '../services/TherapistService';

export class InvoiceBusiness {
    /**
     * Busca todas as faturas de um terapeuta
     * @param userId - ID do usuário terapeuta
     * @returns Lista de faturas do terapeuta
     * @throws Erro se o terapeuta não for encontrado ou não tiver ID do Stripe
     */
    static async getInvoices(userId: string) {
        try {
            const therapist = await TherapistService.getTherapistByUserId(userId);
            if (!therapist) {
                throw new Error('Terapeuta não encontrado');
            }

            console.log(therapist);

            if (!therapist.stripeCustomerId) {
                throw new Error('Cliente Stripe não encontrado');
            }

            const invoices = await getCustomerInvoices(therapist.stripeCustomerId);
            return invoices;
        } catch (error: any) {
            console.error('Erro ao buscar faturas:', error);
            throw new Error(error.message || 'Erro ao buscar faturas');
        }
    }
} 