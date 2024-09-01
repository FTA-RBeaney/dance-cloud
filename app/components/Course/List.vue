<script setup>
const props = defineProps({
  courses: Object,
});
</script>

<template>
  <div>
    <div class="grid grid-cols-12 gap-8 mb-10">
      <div class="col-span-2">
        <div class="shop-sidebar">
          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <CourseFilters />
            </template>
          </Card>

          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <div class="course-sidebar-info">
                <h3 class="drop-btn">Ratings</h3>
                <ul>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-25"
                        name="rating"
                      /><label class="edu-check-star" for="e-25"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i> (25)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-24"
                        name="rating"
                      /><label class="edu-check-star" for="e-24"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fal fa-star"></i> (25)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-12"
                        name="rating"
                      /><label class="edu-check-star" for="e-12"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fas fa-star"></i><i class="fal fa-star"></i
                        ><i class="fal fa-star"></i> (12)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-28"
                        name="rating"
                      /><label class="edu-check-star" for="e-28"
                        ><i class="fas fa-star"></i><i class="fas fa-star"></i
                        ><i class="fal fa-star"></i><i class="fal fa-star"></i
                        ><i class="fal fa-star"></i> (28)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-14"
                        name="rating"
                      /><label class="edu-check-star" for="e-14"
                        ><i class="fas fa-star"></i>
                        <i class="fal fa-star"></i> <i class="fal fa-star"></i
                        ><i class="fal fa-star"></i
                        ><i class="fal fa-star"></i> (14)</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Card>

          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <div class="course-sidebar-info">
                <h3 class="drop-btn">Price</h3>
                <ul>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-85"
                        name="price"
                      /><label class="edu-check-label ml-2" for="e-85"
                        >All (85)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="e-all"
                        name="price"
                      /><label class="edu-check-label ml-2" for="e-all"
                        >Free (21)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="radio"
                        id="f-all"
                        name="price"
                      /><label class="edu-check-label ml-2" for="f-all"
                        >Paid (54)</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Card>

          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <div class="course-sidebar-info">
                <h3 class="drop-btn">Level</h3>
                <ul>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-lave"
                      /><label class="edu-check-label ml-2" for="e-lave"
                        >All levels (5)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-beg"
                      /><label class="edu-check-label ml-2" for="e-beg"
                        >Beginner (36)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-inter"
                      /><label class="edu-check-label ml-2" for="e-inter"
                        >Intermediate (25)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-exp"
                      /><label class="edu-check-label ml-2" for="e-exp"
                        >Expert (32)</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Card>

          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <div class="course-sidebar-info">
                <h3 class="drop-btn">Language</h3>
                <ul>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-eng"
                      /><label class="edu-check-label ml-2" for="e-eng"
                        >English (21))</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-hin"
                      /><label class="edu-check-label ml-2" for="e-hin"
                        >Hindi (12)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-fren"
                      /><label class="edu-check-label ml-2" for="e-fren"
                        >French (7)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-japa"
                      /><label class="edu-check-label ml-2" for="e-japa"
                        >Japanese (10)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-kore"
                      /><label class="edu-check-label ml-2" for="e-kore"
                        >Korean (5)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="m-japa"
                      /><label class="edu-check-label ml-2" for="m-japa"
                        >Japanese (10))</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-span"
                      /><label class="edu-check-label ml-2" for="e-span"
                        >Spanish (14)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-ita"
                      /><label class="edu-check-label ml-2" for="e-ita"
                        >Italian (8)</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Card>

          <Card class="course-sidebar-widget mb-10">
            <template #content>
              <div class="course-sidebar-info">
                <h3 class="drop-btn">Language</h3>
                <ul>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-less"
                      /><label class="edu-check-label ml-2" for="e-less"
                        >Less than 1 Hours (24)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="e-36"
                      /><label class="edu-check-label ml-2" for="e-36"
                        >1-2 Hours (36)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="m-25"
                      /><label class="edu-check-label ml-2" for="m-25"
                        >2-5 Hours (25)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="m-32"
                      /><label class="edu-check-label ml-2" for="m-32"
                        >6-7 Hours (32)</label
                      >
                    </div>
                  </li>
                  <li>
                    <div class="course-sidebar-list">
                      <input
                        class="edu-check-box"
                        type="checkbox"
                        id="m-11"
                      /><label class="edu-check-label ml-2" for="m-11"
                        >7-10 Hours (11)</label
                      >
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </Card>
        </div>
      </div>
      <div class="col-span-10">
        <div class="row grid grid-cols-4 gap-6">
          <Card
            v-for="(course, idx) in courses"
            :key="idx"
            class="card bg-base-100 shadow-xl col-xl-4 col-lg-6 col-md-6 overflow-hidden"
          >
            <template #header>
              <figure
                class="student-course-img w-full h-[200px] overflow-hidden"
              >
                <img
                  :src="course.image"
                  alt="courde-img"
                  class="block w-full object-cover h-full"
                />
              </figure>
            </template>
            <template #title>{{ course.title }}</template>
            <template #subtitle>
              <div class="flex items-center gap-2">
                <Avatar
                  image="https://static.wixstatic.com/media/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg/v1/fill/w_126,h_126,al_c,lg_1,q_80,enc_auto/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg"
                  class="!rounded-full overflow-hidden"
                />{{ course.instructor }}
              </div></template
            >
            <template #content>
              <p class="m-0">
                {{ course.description }}
              </p>
            </template>
            <template #footer>
              <div class="block justify-center w-full gap-4 mt-1">
                <NuxtLink :to="`${course.slug}`">
                  <Button label="View" class="w-full" />
                </NuxtLink>
              </div>
            </template>
          </Card>
        </div>
        <!-- PAGINATION -->
        <!-- <div class="row">
          <div class="col-12">
            <div class="edu-pagination mb-30">
              <ul>
                <li>
                  <a href="#"><i class="fal fa-angle-left"></i></a>
                </li>
                <li class="active">
                  <a href="#"><span>01</span></a>
                </li>
                <li>
                  <a href="#"><span>02</span></a>
                </li>
                <li>
                  <a href="#"><i class="fal fa-angle-right"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
