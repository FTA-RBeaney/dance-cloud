<script setup>
import { BookOpenText, House, Gem, Rss, GraduationCap } from "lucide-vue-next";
const { data: databaseData } = await useAsyncData("databaseData", () => {
  const response = $fetch("/api/notion");

  return response;
});
</script>

<template>
  <aside
    id="layout-menu"
    class="layout-menu menu-vertical menu bg-menu-theme !max-w-md"
    data-bg-class="bg-menu-theme"
    style="
      touch-action: none;
      user-select: none;
      -webkit-user-drag: none;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    "
  >
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-logo demo">
          <img
            src="https://static.wixstatic.com/media/a9cbc1_95139e190a0945b2a7d0ee8f25c76210~mv2.jpg"
            alt="Jazzerz"
          />
        </span>
        <span class="app-brand-text demo menu-text fw-bold">Jazzerz</span>
      </a>

      <a
        href="javascript:void(0);"
        class="layout-menu-toggle menu-link text-large ms-auto"
      >
      </a>
    </div>

    <div class="menu-inner-shadow" style="display: block"></div>

    <ul class="menu-inner py-1 ps ps--active-y">
      <li class="menu-item">
        <NuxtLink to="/" class="menu-link"
          ><House class="w-5 h-5 flex-shrink-0 mr-2" /> Home
        </NuxtLink>
      </li>

      <li class="menu-item">
        <NuxtLink to="/plans" class="menu-link"
          ><Gem class="w-5 h-5 flex-shrink-0 mr-2" /> Plans
        </NuxtLink>
      </li>

      <li class="menu-item">
        <NuxtLink to="/blog" class="menu-link"
          ><Rss class="w-5 h-5 flex-shrink-0 mr-2" /> Blog
        </NuxtLink>
      </li>
      <li class="menu-item">
        <NuxtLink to="/notion" class="menu-link"
          ><GraduationCap class="w-5 h-5 flex-shrink-0 mr-2" /> Courses
        </NuxtLink>
      </li>

      <!-- Components -->
      <!-- <li class="menu-header small">
        <span class="menu-header-text" data-i18n="Components">Courses</span>
      </li>

      <li class="menu-item" v-for="(item, i) in databaseData" :key="`data${i}`">
        <NuxtLink
          class="menu-link"
          :to="{
            path: `/course/${item?.properties?.Slug?.rich_text[0]?.text.content}`,
            query: { id: item.id },
          }"
        >
          <BookOpenText class="w-5 h-5 flex-shrink-0 mr-2" />
          {{ item?.properties.Title?.title[0]?.text?.content }}
        </NuxtLink>
      </li> -->

      <div class="ps__rail-x" style="left: 0px; bottom: -244px">
        <div
          class="ps__thumb-x"
          tabindex="0"
          style="left: 0px; width: 0px"
        ></div>
      </div>
      <div class="ps__rail-y" style="top: 244px; height: 693px; right: 4px">
        <div
          class="ps__thumb-y"
          tabindex="0"
          style="top: 97px; height: 278px"
        ></div>
      </div>
    </ul>
  </aside>
</template>

<style scoped>
.bg-menu-theme.menu-vertical
  .menu-item
  > .menu-link:not(.menu-toggle).router-link-active,
.bg-menu-theme.menu-vertical
  .menu-item
  > .menu-link:not(.menu-toggle).router-link-active:hover {
  background: linear-gradient(
    270deg,
    rgba(115, 103, 240, 0.7) 0%,
    #7367f0 100%
  );
  box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.3);
  color: #fff !important;
}
</style>
