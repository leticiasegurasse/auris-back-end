import Stripe from 'stripe';

const BASE_URL = process.env.FRONTEND_BASE_URL || 'http://localhost:5173';

export const stripe = new Stripe(process.env.STRIPE_SECRET! as string, {
    httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
    const customer = await stripe.customers.list({email});
    return customer.data[0];
};

export const createStripeCustomer = async (data: {
    email: string;
    name: string;
}) => {
    const customer = await getStripeCustomerByEmail(data?.email);
    if (customer) {
        return customer;
    }
    
    return stripe.customers.create({
        email: data.email,
        name: data.name,
    });
};

export const generateCheckout = async (userId: string, email: string) => {
    try {
        const customer = await createStripeCustomer({
            email, 
            name: email
        });
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            client_reference_id: userId,
            customer: customer.id,
            success_url: `${BASE_URL}/done`,
            cancel_url: `${BASE_URL}/error`,
            line_items: [
                {
                    price: process.env.STRIPE_ID_PLAN,
                    quantity: 1,
                }
            ],
        });
        return {
            url: session.url,
        }
    } catch (error) {
        console.error(error);
    }
}

export const getCustomerInvoices = async (customerId: string) => {
    try {
        const invoices = await stripe.invoices.list({
            customer: customerId,
            limit: 10, // Limita a 10 faturas mais recentes
        });

        console.log(customerId);

        return invoices.data.map(invoice => ({
            id: invoice.id,
            amount: invoice.amount_paid,
            status: invoice.status,
            date: new Date(invoice.created * 1000),
            pdf: invoice.invoice_pdf,
            number: invoice.number,
            currency: invoice.currency,
        }));
    } catch (error) {
        console.error('Erro ao buscar faturas:', error);
        throw error;
    }
};

export const cancelSubscription = async (subscriptionId: string) => {
    try {
        const subscription = await stripe.subscriptions.cancel(subscriptionId);
        return subscription;
    } catch (error) {
        console.error('Erro ao cancelar assinatura:', error);
        throw error;
    }
};