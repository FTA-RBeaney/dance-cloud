<script setup>
import { CirclePlay, Eye, Minus, ChevronRight } from "lucide-vue-next";

const props = defineProps({
  databaseId: String,
});

const data = ref();
const isLoading = ref(true);

onMounted(async () => {
  const { body } = await $fetch("/api/notion-page", {
    method: "post",
    body: { id: props.databaseId },
  });
  data.value = body;
  isLoading.value = false;
});
</script>

<template>
  <div>
    <div v-if="isLoading">
      <p>Loading</p>
    </div>
    <div v-else>
      <!-- Start Course Content  -->
      <div
        class="course-content rbt-shadow-box coursecontent-wrapper mt--30"
        id="coursecontent"
      >
        <div class="rbt-course-feature-inner">
          <div class="section-title">
            <h4 class="rbt-title-style-3">Course Content</h4>
          </div>
          <div class="rbt-accordion-style rbt-accordion-02 accordion">
            <div class="accordion" id="accordionExampleb2">
              <div class="accordion-item card">
                <h2 class="accordion-header card-header" id="headingTwo1">
                  <button
                    class="flex justify-between w-full"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo1"
                    aria-expanded="true"
                    aria-controls="collapseTwo1"
                  >
                    Lessons
                    <span class="rbt-badge-5 ml--10">1hr 30min</span>
                    <!-- <Minus class="self-end" /> -->
                  </button>
                </h2>
                <div
                  id="collapseTwo1"
                  class="accordion-collapse show"
                  aria-labelledby="headingTwo1"
                  data-bs-parent="#accordionExampleb2"
                >
                  <div class="accordion-body card-body pr--0">
                    <ul class="rbt-course-main-content liststyle">
                      <li v-for="(item, i) in data.results" :key="`data${i}`">
                        <NuxtLink :to="`/lesson/${item?.id}`">
                          <div class="course-content-left">
                            <CirclePlay :stroke-width="1.5" class="w-6 mr-2" />
                            <span class="text">
                              Lesson {{ i + 1 }}:
                              {{
                                item?.properties.Title.title[0].text.content
                              }}</span
                            >
                          </div>

                          <div class="course-content-right !flex items-center">
                            <span class="min-lable">30 min</span>
                            <span
                              class="rbt-badge variation-03 bg-primary-opacity !flex items-center"
                              ><Eye :stroke-width="1.5" class="w-6 mr-2" />
                              Watch</span
                            >
                          </div>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Course Content  -->
    </div>

    <!-- <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Video URL</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in data?.results"
          :key="`data${i}`"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <NuxtLink :to="`/lesson/${item.id}`">
              {{ item?.properties.Title?.title[0]?.text?.content }}
            </NuxtLink>
          </th>
          <td class="max-w-80 truncate">
            {{ item?.properties.VideoURL?.rich_text[0]?.text?.content }}
          </td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<style scoped>
.rbt-accordion-style.rbt-accordion-02 .card .card-header {
  padding-right: 0;
}
.rbt-accordion-style .card .card-header button::before {
  content: none;
}
.course-sidebar-top {
  margin-top: -230px;
}

.accordion:not(.accordion-bordered) > .card.accordion-item {
  box-shadow: none;
}
</style>
