<script setup>
import { Timer, Star } from 'lucide-vue-next';
const props = defineProps({
  item: Object,
  listView: Boolean,
});

const tagColor = computed(() => {
  if (
    props.item?.properties?.Tag?.rich_text[0]?.text.content === 'foundation'
  ) {
    return '!bg-green-500 text-white';
  } else if (
    props.item?.properties?.Tag?.rich_text[0]?.text.content === 'introduction'
  ) {
    return '!bg-slate-500 text-white';
  } else if (
    props.item?.properties?.Tag?.rich_text[0]?.text.content === 'wisdom'
  ) {
    return '!bg-pink-500 text-white';
  } else {
    return;
  }
});
</script>
<template>
  <div
    class="card p-2 h-100 shadow-none border"
    :class="listView && '!flex-row'"
  >
    <div
      class="rounded-2 text-center"
      :class="listView ? 'w-[30%] mr-2 !mb-0' : 'mb-4'"
    >
      <a href="app-academy-course-details.html">
        <img
          :src="item.properties?.ImageURL?.rich_text[0]?.text.content"
          :alt="item.properties?.Title?.title[0]?.text.content"
          class="object-cover h-full"
          :class="!listView && 'aspect-video'"
      /></a>
    </div>
    <div class="card-body p-2 pt-2 w-full">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <Tag
          v-if="item?.properties?.Tag?.rich_text[0]?.text.content"
          :value="item?.properties?.Tag?.rich_text[0]?.text.content"
          class="badge bg-label-primary !font-bold capitalize"
          :class="tagColor"
        ></Tag>

        <p
          class="flex items-center justify-center text-sm fw-medium gap-1 mb-0"
        >
          4.4
          <span class="text-warning">
            <Star :stroke-width="1.5" class="fill-yellow-400" /> </span
          ><span class="fw-normal">(1.23k)</span>
        </p>
      </div>
      <NuxtLink
        class="h5"
        :to="{
          path: `/course/${item?.properties?.Slug?.rich_text[0]?.text.content}`,
          query: { id: item.id },
        }"
      >
        {{ item?.properties.Title?.title[0]?.text?.content }}
      </NuxtLink>

      <p class="mt-1 text-sm max-h-[200px]" :class="!listView && 'truncate'">
        {{ item?.properties.Description?.rich_text[0]?.text?.content }}
      </p>

      <!-- <p class="flex items-center mb-1 text-sm">
        <Timer :stroke-width="1.5" class="mr-1 w-5 h-5" />30 minutes
      </p>
      <div class="progress rounded-pill mb-4" style="height: 8px">
        <div
          class="progress-bar w-75"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div> -->
      <div
        class="d-flex flex-column flex-md-row gap-4 text-nowrap flex-wrap flex-md-nowrap flex-lg-wrap flex-xxl-nowrap"
        :class="!listView && 'justify-center'"
      >
        <!-- <Button label="Start over" /> -->
        <NuxtLink
          :to="{
            path: `/course/${item?.properties?.Slug?.rich_text[0]?.text.content}`,
            query: { id: item.id },
          }"
        >
          <Button label="View course" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
