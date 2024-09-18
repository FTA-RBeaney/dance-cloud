<script setup>
const selected = ref('all');

const { data: databaseData } = await useAsyncData('databaseData', () => {
  const response = $fetch('/api/notion');

  return response;
});

const filtered = computed(() => {
  if (selected.value === 'all') return databaseData.value;
  return databaseData.value.filter(
    (s) => s.properties?.Tag?.rich_text[0]?.text.content === selected.value
  );
});

const listView = ref(false);
</script>
<template>
  <div>
    <CourseHeader
      image="https://res.cloudinary.com/dgbn0ttzf/image/upload/v1725362678/alex_hero_cover-min-1024x468_1_p3f8mt.jpg"
    />
    <div class="container !max-w-screen-lg mt-10">
      <div class="d-flex flex-wrap justify-content-between gap-4">
        <div class="card-title mb-0 me-1">
          <h5 class="mb-0">My Courses</h5>
          <p class="mb-0">Total 6 course you have purchased</p>
        </div>
        <div
          class="d-flex justify-content-md-end align-items-center column-gap-6"
        >
          <select v-model="selected" class="form-select">
            <option value="all">All Courses</option>
            <option value="introduction">Introduction</option>
            <option value="foundation">Foundation</option>
            <option value="wisdom">Wisdom</option>
            <option value="artistry">Artistry</option>
          </select>

          <div class="form-check form-switch my-2 ms-2">
            <label
              class="form-check-label text-nowrap mb-0 pr-2 !text-gray-600 !text-sm"
              for="CourseSwitch"
              >Grid view</label
            >
            <input
              type="checkbox"
              class="form-check-input"
              id="CourseSwitch"
              v-model="listView"
            />
            <label
              class="form-check-label text-nowrap mb-0 !text-gray-600 !text-sm"
              for="CourseSwitch"
              >List view</label
            >
          </div>
        </div>
      </div>
      <div class="mt-6">
        <div class="grid grid-cols-3 gap-4 mb-6" :class="listView && '!block'">
          <div class="" v-for="(item, i) in filtered" :key="`data${i}`">
            <CourseCard :item="item" :listView="listView" />
          </div>
        </div>
      </div>

      <!-- <div v-if="databaseData" class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">Title</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in databaseData"
              :key="`data${i}`"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <NuxtLink
                  :to="{
                    path: `course/${item?.properties?.Slug?.rich_text[0]?.text.content}`,
                    query: { id: item.id },
                  }"
                >
                  {{ item?.properties.Title?.title[0]?.text?.content }}
                </NuxtLink>
              </th>
              <td class="max-w-80">
                {{ item?.properties.Description?.rich_text[0]?.text?.content }}
              </td>
              <td class="px-6 py-4">
                <span
                  value="Primary"
                  v-for="(tag, i) in item.properties.Tags.multi_select"
                  :key="`tag${i}`"
                  class="mr-2"
                >
                  <Tag
                    v-if="tag.color === 'yellow'"
                    :value="tag.name"
                    class="!bg-yellow-200 !text-yellow-900"
                  ></Tag>
                  <Tag
                    v-else
                    :value="tag.name"
                    class="!bg-zinc-200 !text-zinc-900"
                  ></Tag>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
  </div>
</template>
