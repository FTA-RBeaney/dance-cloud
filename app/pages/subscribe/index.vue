<script setup>
const router = useRouter();
const user = await useRequestURL();

function goToRegister() {
  router.push("/register");
}
</script>

<template>
  <div>
    <h2>Sub</h2>

    <Button
      v-if="user === null"
      @click="goToRegister"
      label="Sign up and subscribe"
    />
    <form v-else action="/api/subscribe" method="POST">
      <input
        type="hidden"
        name="lookup_key"
        value="price_1NOfDEItDgRR1lKmm3MxcSqe"
      />
      <input type="hidden" name="customer_id" :value="user.id" />
      <Button type="submit" label="Submit" />
    </form>
  </div>
</template>
