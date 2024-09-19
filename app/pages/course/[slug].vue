<script setup>
import { Eye } from 'lucide-vue-next';

const route = useRoute();
const data = ref();
const courseData = ref();
const visible = ref();

const { data: body } = await useFetch('/api/notion-blocks', {
  method: 'post',
  body: { id: route.query.id },
});

const { data: response } = await useFetch('/api/notion-page-retrieve', {
  method: 'post',
  body: { id: route.query.id },
});

courseData.value = response.value.response;

const childDatabase = body.value.body.results.find(
  (item) => item.type === 'child_database'
);

data.value = childDatabase;
</script>

<template>
  <div>
    <CourseHeader
      :title="courseData?.properties?.Title.title[0].text.content"
      :image="courseData?.properties?.ImageURL.rich_text[0].text.content"
    />
    <div class="container">
      <div class="rbt-course-details-area">
        <!-- <pre>{{ courseData }}</pre> -->
        <div class="container">
          <div class="row g-5">
            <div class="col-lg-8">
              <div class="course-details-content">
                <!-- Start Course Feature Box  -->
                <div
                  class="rbt-course-feature-box overview-wrapper rbt-shadow-box mt--30"
                  id="overview"
                >
                  <div class="rbt-course-feature-inner">
                    <div class="section-title">
                      <h4 class="rbt-title-style-3">What you'll learn</h4>
                    </div>

                    <p>
                      {{
                        courseData?.properties?.Description.rich_text[0].text
                          .content
                      }}
                    </p>
                  </div>
                </div>
                <!-- End Course Feature Box  -->
                <CourseTable v-if="data" :database-id="data.id" />
              </div>
            </div>

            <div class="col-lg-4">
              <div
                class="course-sidebar sticky-top rbt-shadow-box course-sidebar-top shadow"
              >
                <div class="inner">
                  <!-- Start Video Wrapper  -->

                  <div
                    class="video-popup-with-text video-popup-wrapper text-center popup-video sidebar-video-hidden mb--15 cursor-pointer"
                    @click="visible = true"
                    @mouseenter="onHoverEnter(i)"
                    @mouseleave="onHoverLeave(i)"
                  >
                    <div class="video-content">
                      <video
                        id="video-preview"
                        width="500"
                        ref="video"
                        poster="https://res.cloudinary.com/dgbn0ttzf/video/upload/so_auto,f_jpg/v1725361669/Jazz_Slides_1_-_720_s0fgfp.mp4"
                        preload
                        loop
                        muted
                        src="https://res.cloudinary.com/dgbn0ttzf/video/upload/q_auto,e_preview/v1725361669/Jazz_Slides_1_-_720_s0fgfp.mp4"
                      ></video>
                      <div class="position-to-top">
                        <span class="rbt-btn rounded-player-2 !w-20 !h-20">
                          <span class="play-icon"></span>
                        </span>
                      </div>
                      <span class="play-view-text d-block color-white"
                        ><Eye class="inline" /> Preview this course
                      </span>
                    </div>
                  </div>
                  <Dialog
                    v-model:visible="visible"
                    maximizable
                    modal
                    header="Lesson title"
                    :style="{ width: '50rem' }"
                    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
                  >
                    <video
                      poster="https://res.cloudinary.com/dgbn0ttzf/video/upload/so_auto,f_jpg/v1725361669/Jazz_Slides_1_-_720_s0fgfp.mp4"
                      width="720"
                      preload
                      controls
                      src="https://res.cloudinary.com/dgbn0ttzf/video/upload/v1725361669/Jazz_Slides_1_-_720_s0fgfp.mp4"
                    ></video>
                  </Dialog>
                  <!-- End Video Wrapper  -->

                  <div class="content-item-content">
                    <div
                      class="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between"
                    >
                      <div class="rbt-price">
                        <span class="current-price">$60.99</span>
                        <span class="off-price">$84.99</span>
                      </div>
                      <div class="discount-time">
                        <span
                          class="rbt-badge color-danger bg-color-danger-opacity"
                          ><i class="feather-clock"></i> 3 days left!</span
                        >
                      </div>
                    </div>

                    <div class="add-to-card-button mt--15">
                      <!-- <NuxtLink
                      class="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                      :to="`/lesson/${data[0]?.id}`"
                    >
                      <span class="btn-text">Start course</span>
                      <span class="btn-icon"><ChevronRight class="h-4" /></span>
                    </NuxtLink> -->
                    </div>

                    <span class="subtitle"
                      ><i class="feather-rotate-ccw"></i> 30-Day Money-Back
                      Guarantee</span
                    >

                    <div class="rbt-widget-details">
                      <ul class="rbt-course-details-list-wrapper">
                        <li>
                          <span>Number of videos</span
                          ><span class="rbt-feature-value rbt-badge-5">{{
                            data?.length
                          }}</span>
                        </li>
                        <li>
                          <span>Enrolled</span
                          ><span class="rbt-feature-value rbt-badge-5"
                            >100</span
                          >
                        </li>
                        <li>
                          <span>Skill Level</span
                          ><span class="rbt-feature-value rbt-badge-5"
                            >Basic</span
                          >
                        </li>
                        <li>
                          <span>Language</span
                          ><span class="rbt-feature-value rbt-badge-5"
                            >English</span
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="related-course mt--60">
            <div class="row g-5 align-items-end mb--40">
              <div class="col-lg-8 col-md-8 col-12">
                <div class="section-title">
                  <span class="subtitle bg-pink-opacity">Top Courses</span>
                  <h4 class="title">
                    <strong class="color-primary">More</strong> courses
                  </h4>
                </div>
              </div>
              <div class="col-lg-4 col-md-4 col-12">
                <div class="read-more-btn text-start text-md-end">
                  <NuxtLink
                    class="rbt-btn rbt-switch-btn btn-border btn-sm"
                    to="/courses"
                  >
                    <span data-text="View All Courses">View All Courses</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <!-- <CourseList :courses="courses" /> -->
          </div>
        </div>
      </div>

      <AddComment :post-id="route.query.id" />
      <!-- <CourseCommentList :commentData="commentData" class="mt-20" /> -->

      <!-- <div v-if="databaseData" class="relative overflow-x-auto">
      <table
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
            v-for="(item, i) in databaseData.results"
            :key="`data${i}`"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item?.properties.Title?.title[0]?.text?.content }}
            </th>
            <td class="max-w-80 truncate">
              {{ item?.properties.VideoURL?.rich_text[0]?.text?.content }}
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
      <!-- <pre>{{ route.query }}</pre>
    <pre>{{ databaseData }}</pre> -->
      <!-- <CourseHeader :course="course" :image="course.image" />
    <CourseDetails :course="course" /> -->
    </div>
  </div>
</template>
