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
    <CourseHeader :course="course" :image="course.image" />
    <CourseDetails :course="course" />
  </div>
</template>
