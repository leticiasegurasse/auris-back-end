import { getCustomerInvoices } from '../utils/stripe';
import { TherapistService } from '../services/TherapistService';

export class InvoiceBusiness {
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