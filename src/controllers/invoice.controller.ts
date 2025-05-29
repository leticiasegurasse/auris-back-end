import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { InvoiceBusiness } from '../business/InvoiceBusiness';

export class InvoiceController {
    static async getInvoices(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: 'ID do usuário não encontrado no token.' });
                return;
            }

            const invoices = await InvoiceBusiness.getInvoices(userId);
            res.json(invoices);
        } catch (error: any) {
            console.error('Erro ao buscar faturas:', error);
            res.status(error.message === 'Cliente não encontrado' ? 404 : 500)
               .json({ message: error.message || 'Erro ao buscar faturas' });
        }
    }
} 