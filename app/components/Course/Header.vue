<script setup>
import { ChevronRight, Star, CalendarDays } from 'lucide-vue-next';
const route = useRoute();
const props = defineProps({
  course: Object,
  image: String,
  title: String,
});
</script>

<template>
  <div
    class="rbt-breadcrumb-default rbt-breadcrumb-style-3 relative flex py-[80px] !min-h-[420px] w-full !items-end"
  >
    <div class="breadcrumb-inner">
      <img
        :src="
          props.image ||
          'https://res.cloudinary.com/dgbn0ttzf/image/upload/v1725323981/alex_1-min-1024x769_1_tle9fd.jpg'
        "
        class="bg-cover h-auto bg-center"
        alt="Education Images"
      />
      <div
        class="absolute left-0 top-0 w-full h-full bg-gradient-to-t from-black opacity-60"
      ></div>
    </div>
    <div class="pl-20 w-full">
      <div class="row">
        <div class="col-lg-8">
          <div class="content text-start">
            <ul class="page-list flex items-center text-white">
              <li class="rbt-breadcrumb-item text-white">
                <NuxtLink to="/">Home</NuxtLink>
              </li>
              <li v-if="route.params.course">
                <div class="icon-right">
                  <ChevronRight :stroke-width="1.5" class="h-5" />
                </div>
              </li>
              <li class="rbt-breadcrumb-item" v-if="route.params.course">
                <NuxtLink to="/courses">Courses</NuxtLink>
              </li>
              <li v-if="route.params.slug">
                <div class="icon-right">
                  <ChevronRight :stroke-width="1.5" class="h-5" />
                </div>
              </li>
              <li class="rbt-breadcrumb-item" v-if="route.params.slug">
                <NuxtLink :to="`/${route.params.course}`">{{
                  route.params.course
                }}</NuxtLink>
              </li>
              <li>
                <div class="icon-right">
                  <ChevronRight :stroke-width="1.5" class="h-5" />
                </div>
              </li>
              <li class="rbt-breadcrumb-item active">
                {{ course?.title || route.name }}
              </li>
            </ul>
            <h2 class="title">
              {{ course?.title || title || 'Courses' }}
            </h2>
            <!-- <p class="description">
              {{ course?.description || "" }}
            </p> -->

            <div
              v-if="route.params.course"
              class="d-flex align-items-center mb--20 flex-wrap rbt-course-details-feature"
            >
              <div
                class="feature-sin rating flex items-center justify-between w-[100px]"
              >
                <a href="#" class="mr-2">4.8</a>
                <a href="#"><Star :stroke-width="1.5" class="h-5 w-5" /></a>
                <a href="#"><Star :stroke-width="1.5" class="h-5 w-5" /></a>
                <a href="#"><Star :stroke-width="1.5" class="h-5 w-5" /></a>
                <a href="#"><Star :stroke-width="1.5" class="h-5 w-5" /></a>
                <a href="#"><Star :stroke-width="1.5" class="h-5 w-5" /></a>
              </div>

              <div class="feature-sin total-rating">
                <a class="rbt-badge-4" href="#">215,475 rating</a>
              </div>

              <div class="feature-sin total-student">
                <span>616,029 students</span>
              </div>
            </div>

            <div v-if="route.params.course" class="rbt-author-meta mb--20">
              <div class="rbt-avater">
                <a href="#">
                  <img
                    src="https://static.wixstatic.com/media/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg/v1/fill/w_126,h_126,al_c,lg_1,q_80,enc_auto/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg"
                    alt="Sophia Jaymes"
                  />
                </a>
              </div>
              <div class="rbt-author-info" v-if="course?.instructor">
                By <a href="profile.html">{{ course?.instructor }}</a>
              </div>
            </div>

            <ul v-if="route.params.course" class="rbt-meta mt-2">
              <li class="!flex items-center">
                <CalendarDays :stroke-width="1.5" class="h-6" /><span
                  >Last updated 12/2024</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End Breadcrumb Area -->
</template>

<style scoped>
.rbt-breadcrumb-default .title,
.rbt-breadcrumb-style-3 .description,
.page-list li,
.page-list li.active,
.rbt-breadcrumb-style-3 .rbt-meta li,
.rbt-author-meta .rbt-author-info a,
.rbt-breadcrumb-style-3 .total-student span,
.rbt-badge-4,
.rating a,
.rbt-author-meta,
.page-list li a,
.page-list li.active,
a {
  text-transform: capitalize;
  color: white;
}
</style>
