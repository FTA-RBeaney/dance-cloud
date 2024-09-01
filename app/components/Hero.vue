<script setup>
const props = defineProps({
  title: String,
  image: String,
});

const route = useRoute();
</script>

<template>
  <div
    class="hero-arera course-item-height mb-10 w-full h-[400px] flex items-center bg-cover"
    :style="{ backgroundImage: `url(${image})` }"
  >
    <div class="container mx-20">
      <div class="row">
        <div class="col-xl-12">
          <div class="hero-course-1-text">
            <h2 class="text-[6rem] text-white font-black tracking-wider">
              {{ title }}
            </h2>
          </div>
          <div class="course-title-breadcrumb">
            <nav>
              <ol class="breadcrumb flex gap-2 text-white">
                <li class="breadcrumb-item"><a href="/" class="">Home</a></li>
                <li v-if="route.params.course" class="breadcrumb-item">
                  <NuxtLink to="/courses">Courses</NuxtLink>
                </li>
                <li v-if="route.params.slug" class="breadcrumb-item">
                  <NuxtLink :to="`/${route.params.course}`">{{
                    route.params.course
                  }}</NuxtLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ title }}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.breadcrumb-item:after {
  padding-left: 0.5rem;
  content: ">";
}
.breadcrumb-item:last-child:after {
  content: none;
}
</style>
