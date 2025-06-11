import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { UserPlanService, updateUserPlanPaymentStatus } from '../services/UserPlanService';
import { TherapistService } from '../services/TherapistService';

dotenv.config();

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET || '', {
  apiVersion: '2025-04-30.basil',
});

// Função auxiliar para atualizar o status da assinatura do terapeuta
const updateTherapistSubscription = async (subscriptionId: string, status: string, customerId: string) => {
  try {
    const therapist = await TherapistService.getTherapistByStripeCustomerId(customerId) as { _id: string };
    console.log('customerId:', customerId);
    if (therapist) {
      await TherapistService.updateTherapist(therapist._id.toString(), {
        stripeSubscriptionStatus: status,
        stripeSubscriptionId: subscriptionId
      });
      console.log('Therapist atualizado com sucesso para a subscription:', subscriptionId);
    }
  } catch (error) {
    console.error('Erro ao atualizar Therapist para a subscription:', subscriptionId, error);
  }
};

/**
 * Webhook para receber eventos da Stripe.
 */
router.post(
  '/stripe',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

    if (!sig) {
      console.error('Erro: Cabeçalho stripe-signature ausente');
      res.status(400).send('Webhook Error: Cabeçalho stripe-signature ausente');
      return;
    }

    if (!webhookSecret) {
      console.error('Erro: STRIPE_WEBHOOK_KEY não está definido no ambiente');
      res.status(500).send('Webhook Error: Configuração incompleta do webhook');
      return;
    }

    let event: Stripe.Event;
    try {
      // Constrói o evento a partir do body raw, da assinatura e da chave do webhook
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Erro na validação do webhook:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Trata os eventos que impactam o UserPlan e atualiza o payment_status no banco
    switch (event.type) {
      // Quando a assinatura é criada, cria o registro do UserPlan com status inicial
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionData = {
          stripe_subscription_id: subscription.id,
          // Se a assinatura está ativa, pode ser considerado pago; caso contrário, pendente.
          payment_status: subscription.status === 'active' ? 'pago' as const : 'pendente' as const,
        };
        try {
          await UserPlanService.createUserPlan(subscriptionData);
          await updateTherapistSubscription(subscription.id, subscription.status, subscription.customer as string);
          console.log('UserPlan e Therapist atualizados com sucesso para a subscription:', subscription.id);
        } catch (error) {
          console.error('Erro ao criar/atualizar UserPlan e Therapist para a subscription:', subscription.id, error);
        }
        break;
      }

      // Quando o checkout é concluído e o pagamento confirmado, atualiza para "pago"
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription && session.payment_status === 'paid') {
          const subscriptionId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'pago');
            await updateTherapistSubscription(subscriptionId, 'active', session.customer as string);
            console.log('UserPlan e Therapist atualizados para pago via checkout.session.completed:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan e Therapist via checkout.session.completed:', subscriptionId, error);
          }
        }
        break;
      }

      // Pagamento da invoice bem-sucedido: atualiza o status para "pago"
      case 'invoice.payment_succeeded': {
        const invoice: any = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;
        if (subscriptionId) {
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'pago');
            await updateTherapistSubscription(subscriptionId, 'active', invoice.customer as string);
            console.log('UserPlan e Therapist atualizados para pago via invoice.payment_succeeded:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan e Therapist via invoice.payment_succeeded:', subscriptionId, error);
          }
        } else {
          console.error('Invoice sem ID de assinatura:', invoice.id);
        }
        break;
      }

      // Pagamento da invoice falhou: atualiza o status para "falhou"
      case 'invoice.payment_failed': {
        const invoice: any = event.data.object as Stripe.Invoice;
        const subscriptionId = typeof invoice.subscription === 'string'
          ? invoice.subscription
          : invoice.subscription?.id;
        if (subscriptionId) {
          try {
            await updateUserPlanPaymentStatus(subscriptionId, 'falhou');
            await updateTherapistSubscription(subscriptionId, 'past_due', invoice.customer as string);
            console.log('UserPlan e Therapist atualizados para falhou via invoice.payment_failed:', subscriptionId);
          } catch (error) {
            console.error('Erro ao atualizar UserPlan e Therapist via invoice.payment_failed:', subscriptionId, error);
          }
        } else {
          console.error('Invoice sem ID de assinatura:', invoice.id);
          console.error('Evento completo:', event);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        try {
          await updateUserPlanPaymentStatus(subscription.id, 'falhou');
          await updateTherapistSubscription(subscription.id, 'canceled', subscription.customer as string);
          console.log('UserPlan e Therapist atualizados para falhou via customer.subscription.deleted:', subscription.id);
        } catch (error) {
          console.error('Erro ao atualizar UserPlan e Therapist via customer.subscription.deleted:', subscription.id, error);
        }
        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
        console.log('Evento completo:', event);
    }

    res.json({ received: true });
  }
);

export default router;
