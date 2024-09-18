// composables/useStripe
export function useStripe() {
  const checkout = async (lookupKey: string) => {
    const res = await $fetch('/api/stripe/create-checkout-session', {
      method: 'POST',
      body: {
        lookup_key: lookupKey,
      },
    });

    if (res) {
      await navigateTo(res.url, {
        external: true,
      });
    }
  };

  const navigateToStripeDashboard = async () => {
    const res = await $fetch('/api/stripe/create-portal-session', {
      method: 'POST',
    });

    if (res && 'url' in res) {
      await navigateTo(res.url, {
        external: true,
      });
    } else {
      console.error('Error creating portal session:', res.error);
    }
  };

  const tiers = [
    {
      name: 'Monthly',
      id: 'tier-monthly',
      href: '#',
      priceMonthly: '€45',
      description: 'The essentials to provide your best work for clients.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '48-hour support response time',
      ],
      mostPopular: false,
    },
    {
      name: 'Yearly',
      id: 'tier-yearly',
      href: '#',
      priceMonthly: '€240',
      description: 'A plan that scales with your rapidly growing business.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '24-hour support response time',
        'Marketing automations',
      ],
      mostPopular: true,
    },
  ];

  return { checkout, navigateToStripeDashboard, tiers };
}
