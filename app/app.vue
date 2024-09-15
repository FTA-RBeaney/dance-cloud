<script setup lang="ts">
useSeoMeta({
  title: "NuxtHub Starter",
  description:
    "A Nuxt template to build your full-stack application on the edge.",
});
</script>

<template>
  <div class="light-style layout-navbar-fixed layout-compact layout-menu-fixed">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
