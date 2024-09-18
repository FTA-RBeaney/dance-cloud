import { stripe } from '@/../server/utils/stripe';
import { getServerSession } from '#auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default eventHandler(async (event) => {
  // 2
  const { lookup_key } = await readBody(event);
  // 3
  const authSession = await getServerSession(event);

  if (authSession && authSession.user?.email) {
    const account = await prisma.account.findFirst({
      where: {
        user: {
          email: authSession.user.email,
        },
      },
    });

    // 4
    if (account && account.stripe_customer_id && !account.is_subscribed) {
      // 5
      const prices = await stripe.prices.list({
        lookup_keys: [lookup_key],
        expand: ['data.product'],
      });

      // 6
      const session = await stripe.checkout.sessions.create({
        customer: account.stripe_customer_id, // 6.1
        billing_address_collection: 'auto', // 6.2
        line_items: [
          // 6.3
          {
            price: prices.data[0].id,
            quantity: 1,
          },
        ],
        mode: 'subscription', // 6.4
        success_url: `http://localhost:3000/success`, // 6.5
        cancel_url: `http://localhost:3000/cancelled`,
      });

      if (session.url) {
        return { url: session.url };
      }
    }
  }
});
