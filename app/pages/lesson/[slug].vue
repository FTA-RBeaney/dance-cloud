<script setup>
const isLoaded = ref(false);
const isPlaying = ref(false);
const video = ref();
async function play() {
  await video.value.play();
}
const route = useRoute();
console.log(route);
// const lesson = await queryContent("/courses", route.params.slug).findOne();

const course = {
  title: "Slides",
  description:
    "11 Videos. We go over a wide range of Jazz Slides mainly inspired by Jimmy Slyde. Includes Flash Slide, Shuffle Slide, Backslide, Matchstick, Kickslide, 180°, Forward Slide...",
  image:
    "https://mariborswingfestival.com/wp-content/uploads/2020/01/alex_1-min-1024x769.jpg",
  instructor: "Alexandre McCormack",
  slug: "slides",
};
</script>

<template>
  <div>
    <Hero :title="course.title" :image="course.image" />

    <div class="container mx-auto">
      <div class="flex gap-[30px] lg:gap-[20px]">
        <div class="left max-w-full grow">
          <div>
            <h4
              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] text-edblue mb-[23px]"
            >
              {{ course.title }}
            </h4>

            <div>
              <ScriptVimeoPlayer
                :id="907817133"
                ref="video"
                class="group !w-full"
                @loaded="isLoaded = true"
                @play="isPlaying = true"
                @pause="isPlaying = false"
              >
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
            </div>
          </div>
        </div>

        <!-- right sidebar -->
        <div
          class="right h-full sticky top-[60px] max-w-full w-[370px] lg:w-[300px] shrink-0 space-y-[30px]"
        ></div>
      </div>
    </div>
  </div>
</template>
