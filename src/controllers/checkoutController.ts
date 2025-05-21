import { Request, Response } from 'express';
import { generateCheckout } from '../utils/stripe';

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const { email } = req.body;

        if (!userId || !email) {
            res.status(400).json({ 
                error: 'ID do usuário e email são obrigatórios' 
            });
            return;
        }

        const checkout = await generateCheckout(userId, email);

        if (!checkout?.url) {
            res.status(500).json({ 
                error: 'Erro ao gerar sessão de checkout' 
            });
            return;
        }

        res.status(200).json(checkout);
    } catch (error) {
        console.error('Erro ao criar sessão de checkout:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
}; 