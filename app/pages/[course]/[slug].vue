<script setup>
const isLoaded = ref(false);
const isPlaying = ref(false);
const video = ref();
async function play() {
  await video.value.play();
}
const route = useRoute();
const course = await queryContent("/courses", route.params.course).findOne();

const isLoading = ref(true);
const lessonInfo = ref("blank");

async function getLesson() {
  await course.sections.some((innerArray) => {
    const foundLesson = innerArray.lessons.find(
      (les) => les.slug === route.params.slug
    );
    lessonInfo.value = foundLesson;

    return foundLesson;
  });
}

setTimeout(() => {
  isLoading.value = false;
}, 500);

getLesson();
</script>

<template>
  <div>
    <Hero :title="lessonInfo?.title" :image="course.image" />
    <div class="container max-w-screen-lg mx-auto">
      <div class="flex gap-20">
        <div class="left w-9/12">
          <div>
            <h4
              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] text-edblue mb-[23px]"
            >
              {{ lessonInfo?.title }}
            </h4>

            <div>
              <div
                v-if="isLoading"
                role="status"
                class="flex items-center justify-center w-full aspect-video bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  class="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path
                    d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"
                  />
                  <path
                    d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>

              <div v-else class="rounded-lg overflow-hidden">
                <ClientOnly>
                  <ScriptVimeoPlayer
                    :id="lessonInfo?.videoId"
                    aboveTheFold
                    ref="video"
                    class="group !w-full"
                    @loaded="isLoaded = true"
                    @play="isPlaying = true"
                    @pause="isPlaying = false"
                  >
                    <template #placeholder="{ placeholder }">
                      <img
                        :src="course.image"
                        alt="Video placeholder"
                        class="object-cover w-full aspect-video"
                      />
                    </template>
                    <template #awaitingLoad>
                      <div
                        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 group-hover:bg-blue-700 transition rounded px-6 py-2"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          class="w-10 h-10 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 12C19 12.3557 18.8111 12.6846 18.5039 12.8638L6.50387 19.8638C6.19458 20.0442 5.81243 20.0455 5.50194 19.8671C5.19145 19.6888 5 19.3581 5 19L5 5C5 4.64193 5.19145 4.3112 5.50194 4.13286C5.81243 3.95452 6.19458 3.9558 6.50387 4.13622L18.5039 11.1362C18.8111 11.3154 19 11.6443 19 12Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </template>
                  </ScriptVimeoPlayer>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>

        <!-- right sidebar -->
        <div
          class="right w-3/12 h-full sticky top-[60px] lg:w-[300px]space-y-[30px]"
        >
          <!-- COURSE INFORMATION -->
          <h5 class="font-semibold text-[24px] text-edblue mb-[20px]">
            Chapter menu
          </h5>
          <div v-for="(section, i) in course.sections" :key="`section${i}`">
            <h5 class="font-semibold text-lg text-edblue mb-[20px]">
              {{ section.title }}
            </h5>

            <ul class="mb-[30px]">
              <li
                v-for="(lesson, i) in section.lessons"
                :key="`lesson${i}`"
                class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
              >
                <NuxtLink
                  :to="`${lesson.slug}`"
                  class="font-semibold text-blue-500"
                >
                  {{ lesson.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
