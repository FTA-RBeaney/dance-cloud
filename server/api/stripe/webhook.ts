// server/api/stripe/webhook.ts
import { PrismaClient } from '@prisma/client';
import { stripe } from '@/../server/utils/stripe';

const prisma = new PrismaClient();
const runtimeConfig = useRuntimeConfig();

export default eventHandler(async (event) => {
  // 1
  const body = await readRawBody(event, false);
  let stripeEvent: any = body;
  let subscription;
  let status;
  let plan;
  // 2
  const signature = getHeader(event, 'stripe-signature');

  if (!body) {
    return { error: 'Invalid request body' };
  }

  if (!signature) {
    return { error: 'Invalid stripe-signature' };
  }

  try {
    // 3
    stripeEvent = stripe.webhooks.constructEvent(
      body,
      signature,
      runtimeConfig.STRIPE_WEBHOOK_SECRET_KEY
    );
  } catch (err) {
    const error = createError({
      statusCode: 400,
      statusMessage: `Webhook error: ${err}`,
    });
    return sendError(event, error);
  }
  // 4
  switch (stripeEvent.type) {
    // 5
    case 'customer.subscription.deleted':
      subscription = stripeEvent.data.object;
      status = subscription.status;

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: false,
        },
      });

      break;
    // 6
    case 'customer.subscription.created':
      subscription = stripeEvent.data.object;
      status = subscription.status;
      plan = stripeEvent.data.object.items.data[0].price.lookup_key;

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          is_subscribed: true,
          plan,
        },
      });

      break;

    case 'customer.subscription.updated':
      subscription = stripeEvent.data.object;
      plan = stripeEvent.data.object.items.data[0].price.lookup_key;

      await prisma.account.update({
        where: {
          stripe_customer_id: subscription.customer,
        },
        data: {
          plan,
        },
      });

    default:
      console.log(`Unhandled event type ${stripeEvent.type}.`);
  }
  return { received: true };
});
