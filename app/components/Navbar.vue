<script setup>
import { House, BookOpenText, Mail, Rss, Award } from "lucide-vue-next";
</script>

<template>
  <nav class="navbar justify-center bg-base-300">
    <ul class="menu menu-horizontal flex flex-nowrap overflow-x-auto">
      <li>
        <a>
          <House :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Home
        </a>
      </li>
      <li>
        <NuxtLink to="/courses">
          <BookOpenText :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Courses
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/plans">
          <Award :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Plans
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog">
          <Rss :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Blog
        </NuxtLink>
      </li>
      <li>
        <a>
          <Mail :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Contact
        </a>
      </li>
    </ul>
  </nav>
</template>
