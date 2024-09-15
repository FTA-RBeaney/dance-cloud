<script setup>
import { ArrowRight } from "lucide-vue-next";
const props = defineProps({
  courses: Object,
});
</script>

<template>
  <!-- Start Card Area -->
  <div class="row g-5">
    <!-- Start Single Card  -->
    <div
      class="col-lg-4 col-md-6 col-sm-6 col-12 sal-animate"
      data-sal-delay="150"
      data-sal="slide-up"
      data-sal-duration="800"
      v-for="(course, i) in courses"
      :key="`course${i}`"
    >
      <div class="rbt-card variation-03 rbt-hover">
        <div class="rbt-card-img">
          <NuxtLink class="thumbnail-link" :to="`${course.slug}`">
            <img
              :src="course.image"
              :alt="course.title"
              class="aspect-video object-cover"
            />
            <div class="rbt-btn btn-white icon-hover">
              <span class="btn-text text-md">Read More</span>
              <span class="btn-icon"><ArrowRight /></span>
            </div>
          </NuxtLink>
        </div>

        <div class="rbt-card-body !block !pt-6">
          <Tag
            v-if="course.tag === 'foundation'"
            severity="success"
            value="Foundation"
          />
          <Tag v-if="course.tag === 'wisdom'" severity="info" value="Wisdom" />
          <Tag
            v-if="course.tag === 'routine'"
            severity="danger"
            value="Routine"
          />
          <Tag
            v-if="course.tag === 'artistry'"
            severity="warn"
            value="Artistry"
            class="!bg-purple-500 !text-white"
          ></Tag>
          <div class="flex">
            <h5 class="rbt-card-title !text-xl mt-4">
              <NuxtLink :to="`${course.slug}`">{{ course.title }}</NuxtLink>
            </h5>
            <div class="rbt-card-bottom">
              <a class="transparent-button" href="course-details.html"
                ><i
                  ><svg
                    width="17"
                    height="12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g stroke="#27374D" fill="none" fill-rule="evenodd">
                      <path d="M10.614 0l5.629 5.629-5.63 5.629"></path>
                      <path
                        stroke-linecap="square"
                        d="M.663 5.572h14.594"
                      ></path>
                    </g></svg></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Single Card  -->
  </div>
  <!-- End Card Area -->
</template>

<style scoped>
.rbt-card {
  padding: 0;
}
.rbt-card .rbt-card-body {
  padding: 30px;
}
.rbt-btn.icon-hover .btn-icon svg {
  transition-timing-function: cubic-bezier(0, 0.71, 0.4, 1);
  display: inline-block;
  opacity: 0;
  transform: translateX(-7px);
  transition:
    opacity 0.25s,
    transform 0.5s;
  padding-left: 0;
}
.rbt-btn:hover.icon-hover .btn-icon svg {
  opacity: 1;
  transform: translateX(7px);
}
</style>
