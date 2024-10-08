<script setup lang="ts">
const { status, signIn, data } = useAuth();
const { checkout, navigateToStripeDashboard, tiers } = useStripe();

const handleBuyNow = async (lookupKey: string) => {
  if (data.value?.user?.isSubscribed) {
    await navigateToStripeDashboard();
  } else if (status.value === 'authenticated') {
    await checkout(lookupKey);
  } else {
    signIn('github');
  }
};

const buttonText = computed(() => {
  if (data.value?.user?.isSubscribed) {
    return 'Manage Subscription';
  } else if (status.value === 'authenticated') {
    return 'Buy Now';
  } else {
    return 'Sign In to Buy';
  }
});
</script>

<template>
  <div class="bg-white py-10">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">
          Pricing
        </h2>
        <p
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Pricing plans for teams of&nbsp;all&nbsp;sizes
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600"
      >
        Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi
        iusto modi velit ut non voluptas in. Explicabo id ut laborum.
      </p>
      <div
        class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <div
          v-for="(tier, tierIdx) in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
            tierIdx === 0 ? 'lg:rounded-r-none' : '',
            tierIdx === tiers.length - 1 ? 'lg:rounded-l-none' : '',
            'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
          ]"
        >
          <div>
            <div class="flex items-center justify-between gap-x-4">
              <h3
                :id="tier.id"
                :class="[
                  tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                  'text-lg font-semibold leading-8',
                ]"
              >
                {{ tier.name }}
              </h3>
              <p
                v-if="tier.mostPopular"
                class="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600"
              >
                Most popular
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-gray-600">
              {{ tier.description }}
            </p>
            <p class="mt-6 flex items-baseline gap-x-1">
              <span class="text-4xl font-bold tracking-tight text-gray-900">{{
                tier.priceMonthly
              }}</span>
              <span class="text-sm font-semibold leading-6 text-gray-600"
                >/month</span
              >
            </p>
            <ul
              role="list"
              class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
            >
              <li
                v-for="feature in tier.features"
                :key="feature"
                class="flex gap-x-3"
              >
                <CheckIcon
                  class="h-6 w-5 flex-none text-indigo-600"
                  aria-hidden="true"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
          <button
            @click="() => handleBuyNow(tier.id)"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
              'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
            ]"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
