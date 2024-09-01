<script setup>
const courses = await queryContent("/courses").find();

console.log("courses", courses);
</script>

<template>
  <div>
    <Hero
      title="Courses"
      image="https://mariborswingfestival.com/wp-content/uploads/2020/01/alex_hero_cover-min-1024x468.jpg"
    />

    <div class="container mx-auto">
      <CourseList :courses="courses" />
    </div>
  </div>
</template>
