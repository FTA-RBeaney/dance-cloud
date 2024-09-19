<script setup>
import prisma from '~/lib/prisma';
const user = await prisma.user.findFirst();
</script>

<template>
  <div>
    <h2>MD</h2>
    <p>
      {{ user.name }}
    </p>
  </div>
</template>
