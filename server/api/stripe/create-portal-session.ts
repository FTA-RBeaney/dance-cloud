// server/api/stripe/create-portal-session.ts
import { stripe } from '@/../server/utils/stripe';
import { getServerSession } from '#auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const baseUrl = 'http://localhost:3000';

export default eventHandler(async (event) => {
  const session = await getServerSession(event);

  if (!session?.user?.email) {
    return { error: 'User not authenticated' };
  }

  const account = await prisma.account.findFirst({
    where: {
      user: {
        email: session.user.email,
      },
    },
  });

  if (!account?.stripe_customer_id) {
    return { error: 'Stripe customer not found' };
  }
  // 1
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: account.stripe_customer_id,
    return_url: baseUrl,
  });

  return { url: portalSession.url };
});
