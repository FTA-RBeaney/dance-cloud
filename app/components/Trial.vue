<script setup>
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
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
