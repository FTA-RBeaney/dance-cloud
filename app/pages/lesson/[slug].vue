<script setup>
import "vidstack/bundle";
import "vidstack/icons";
import { ArrowBigLeft, CirclePlay } from "lucide-vue-next";

const isLoaded = ref(false);
const isPlaying = ref(false);
const video = ref();
async function play() {
  await video.value.play();
}

const lessonInfo = ref("blank");
const data = ref();
const route = useRoute();
const courseData = ref();
const isVimeo = ref(false);
const videoId = ref();

function stateChange(event) {
  isPlaying.value = event.data === 1;
}

// get details for current lesson
const { data: response } = await useFetch("/api/notion-page-retrieve", {
  method: "post",
  body: { id: route.params.slug },
});

// get the details of the parent database
const { data: body } = await useFetch("/api/notion-page", {
  method: "post",
  body: { id: response.value.response.parent?.database_id },
});

data.value = body.value.body;
courseData.value = response.value.response;
</script>

<template>
  <div class="rbt-lesson-area bg-color-white">
    <div class="rbt-lesson-content-wrapper">
      <div class="rbt-lesson-leftsidebar">
        <div class="rbt-course-feature-inner rbt-search-activation">
          <div class="section-title">
            <h4 class="rbt-title-style-3">Course Content</h4>
          </div>

          <div
            class="rbt-accordion-style rbt-accordion-02 for-right-content accordion"
          >
            <div class="accordion" id="accordionExampleb2">
              <div class="accordion-item card">
                <h2 class="accordion-header card-header" id="headingTwo1">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    data-bs-target="#collapseTwo1"
                    aria-controls="collapseTwo1"
                  >
                    Section title
                  </button>
                </h2>
                <div
                  id="collapseTwo1"
                  class="accordion-collapse show"
                  aria-labelledby="headingTwo1"
                >
                  <div class="accordion-body card-body">
                    <ul class="rbt-course-main-content liststyle">
                      <li
                        v-for="(lesson, i) in data?.results"
                        :key="`lesson${i}`"
                      >
                        <a href="lesson.html" class="active">
                          <div class="course-content-left">
                            <CirclePlay class="w-7 max-w-7 min-w-7 mr-4" />
                            <span class="text"
                              ><NuxtLink :to="`${lesson?.id}`" class="text-sm">
                                {{
                                  lesson.properties.Title.title[0].text.content
                                }}
                              </NuxtLink></span
                            >
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="rbt-lesson-rightsidebar justify-between overflow-hidden lesson-video"
      >
        <div class="items-start">
          <div class="w-12/12">
            <div class="lesson-top-bar">
              <div class="lesson-top-left">
                <div class="rbt-lesson-toggle flex items-center">
                  <NuxtLink
                    to="/courses"
                    class="lesson-toggle-active btn-round-white-opacity flex items-center justify-center"
                    title="Toggle Sidebar"
                  >
                    <ArrowBigLeft :stroke-width="1.5" class="h-10" />
                  </NuxtLink>
                </div>
                <h5>
                  {{ courseData?.properties?.Title.title[0].text.content }}
                </h5>
              </div>
              <div class="lesson-top-right">
                <div class="rbt-btn-close">
                  <a
                    href="course-details.html"
                    title="Go Back to Course"
                    class="rbt-round-btn"
                    ><i class="feather-x"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="inner">
              <media-player
                class="player"
                :title="courseData?.properties?.Title.title[0].text.content"
                :src="
                  courseData?.properties?.VideoURL.rich_text[0].text.content
                "
                crossOrigin
                playsInline
                @can-play="onCanPlay"
              >
                <ClientOnly>
                  <media-provider>
                    <media-google-cast-button class="vds-button">
                      <!-- See "Icons" component page for setup before using the following: -->
                      <media-icon
                        type="chromecast"
                        class="vds-icon"
                      ></media-icon>
                    </media-google-cast-button>
                  </media-provider>

                  <media-plyr-layout></media-plyr-layout>
                </ClientOnly>
              </media-player>

              <div class="content">
                <div class="section-title">
                  <h4>About Lesson</h4>
                  <p>
                    Let us analyze the greatest hits of the past and learn what
                    makes these tracks so special.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-color-extra2 ptb--15 overflow-hidden">
          <div class="rbt-button-group">
            <a
              class="rbt-btn icon-hover icon-hover-left btn-md bg-primary-opacity"
              href="#"
            >
              <span class="btn-icon"><i class="feather-arrow-left"></i></span>
              <span class="btn-text">Previous</span>
            </a>

            <a class="rbt-btn icon-hover btn-md" href="#">
              <span class="btn-text">Next</span>
              <span class="btn-icon"><i class="feather-arrow-right"></i></span>
            </a>
          </div>
        </div>
        <CourseCommentList class="mt-20" />
      </div>
    </div>
  </div>
</template>

<style>
.rbt-lesson-content-wrapper {
  min-height: calc(100vh - 80px);
}
.rbt-lesson-content-wrapper .rbt-lesson-leftsidebar {
  width: 300px;
  flex: 0 0 300px;
}
.rbt-accordion-style.rbt-accordion-02 .card .card-header {
  padding-right: 0;
}
.rbt-accordion-style .card .card-header button::before {
  content: none;
}

.router-link-active {
  color: var(--color-primary);
}

iframe.vds-youtube[data-no-controls] {
  height: 100% !important;
}
</style>
