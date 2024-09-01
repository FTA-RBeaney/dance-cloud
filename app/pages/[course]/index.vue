<script setup>
import {
  Gauge,
  Clock,
  NotebookText,
  UsersRound,
  Medal,
  Globe,
  Star,
  StarHalf,
  Facebook,
  Instagram,
} from "lucide-vue-next";
const route = useRoute();

const course = await queryContent("/courses", route.params.course).findOne();
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

            <!-- course meta -->
            <div
              class="border-b border-[#E5E5E5] pb-[25px] flex xs:flex-wrap items-center gap-[60px] lg:gap-[40px] xs:gap-[20px]"
            >
              <!-- single info -->
              <div
                class="flex items-center gap-[10px] border-l border-[#CDCDCD] first:border-none pl-[10px] first:pl-0"
              >
                <img
                  src="https://static.wixstatic.com/media/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg/v1/fill/w_126,h_126,al_c,lg_1,q_80,enc_auto/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg"
                  alt="Course Instructor"
                  class="w-[52px] aspect-square rounded-full object-cover"
                />
                <div>
                  <h6 class="font-medium text-edblue leading-[1.2] text-[16px]">
                    {{ course.instructor }}
                  </h6>
                  <span
                    class="font-medium text-[14px] text-gray-600 leading-[1]"
                    >Teacher</span
                  >
                </div>
              </div>

              <!-- single info -->
              <div
                class="flex items-center gap-[10px] border-l border-[#CDCDCD] first:border-none pl-[10px] first:pl-0"
              >
                <div>
                  <h6 class="font-medium text-edblue leading-[1.2] text-[16px]">
                    Categories
                  </h6>
                  <span
                    class="font-medium text-[14px] text-gray-600 leading-[1]"
                    >Online Teaching</span
                  >
                </div>
              </div>

              <!-- single info -->
              <div
                class="flex items-center gap-[10px] border-l border-[#CDCDCD] first:border-none pl-[10px] first:pl-0"
              >
                <div>
                  <h6 class="font-medium text-edblue leading-[1.2] text-[16px]">
                    Reviews
                  </h6>
                  <div
                    class="flex gap-[7px] text-[#FFA41B] text-[14px] mt-[6px]"
                  >
                    <Star
                      :stroke-width="1.5"
                      :size="20"
                      class="fill-[#FFA41B]"
                    />
                    <Star
                      :stroke-width="1.5"
                      :size="20"
                      class="fill-[#FFA41B]"
                    />
                    <Star
                      :stroke-width="1.5"
                      :size="20"
                      class="fill-[#FFA41B]"
                    />
                    <Star
                      :stroke-width="1.5"
                      :size="20"
                      class="fill-[#FFA41B]"
                    />
                    <StarHalf
                      :stroke-width="1.5"
                      :size="20"
                      class="fill-[#FFA41B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- tabs container -->
            <Tabs value="0">
              <!-- tab navs  -->

              <TabList class="mb-12">
                <Tab value="0" as="div">
                  <span class="font-bold whitespace-nowrap">Overview</span>
                </Tab>
                <Tab value="1" as="div">
                  <span class="font-bold whitespace-nowrap"
                    >Curriculum</span
                  ></Tab
                >
                <Tab value="2" as="div">
                  <span class="font-bold whitespace-nowrap"
                    >Instructor</span
                  ></Tab
                >
                <Tab value="3" as="div">
                  <span class="font-bold whitespace-nowrap">Reviews</span></Tab
                >
              </TabList>

              <!-- tabs -->
              <div class="ed-course-details-tabs">
                <!-- tab 01 -->
                <Card>
                  <template #content>
                    <TabPanels>
                      <TabPanel value="0">
                        <div
                          id="overview"
                          class="ed-tab duration-[400ms] active"
                        >
                          <div>
                            <h4
                              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] mb-[15px]"
                            >
                              Course Descriptions
                            </h4>
                            <div class="space-y-[10px]">
                              <p class="text-edgray">
                                {{ course.description }}
                              </p>
                            </div>
                          </div>

                          <div>
                            <h4
                              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] mt-7 text-edblue mb-[15px]"
                            >
                              Requirements for The Course
                            </h4>
                            <div class="space-y-[10px]">
                              <p class="text-edgray">
                                Nulla facilisi. Vestibulum tristique sem in eros
                                eleifend imperdiet. Donec quis convallis neque.
                                In id lacus pulvinar lacus, eget vulputate
                                lectus. Ut viverra bibendum lorem, at tempus
                                nibh mattis in. Sed a massa eget lacus consequat
                                auctor.
                              </p>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="1">
                        <!-- tab 02 -->
                        <div id="curriculum" class="ed-tab duration-[400ms]">
                          <div class="mb-[10px]">
                            <h4
                              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] text-edblue mb-[15px]"
                            >
                              Course Curriculum
                            </h4>
                            <div class="space-y-[10px]">
                              <p class="text-edgray">
                                {{ course.description }}
                              </p>
                            </div>
                          </div>

                          <!-- curriculum #1 -->
                          <div
                            v-for="(section, i) in course.sections"
                            :key="`section${i}`"
                            class="mt-[32px]"
                          >
                            <h5
                              class="font-semibold text-[20px] text-edblue mb-[16px]"
                            >
                              {{ section.title }}
                            </h5>

                            <div class="space-y-[12px]">
                              <!-- single curriculum -->
                              <div
                                v-for="(lesson, i) in section.lessons"
                                :key="`lesson${i}`"
                                class="px-[16px] py-[14px] flex flex-wrap gap-[10px] items-center justify-between bg-purple-600/[6%] rounded-[8px]"
                              >
                                <!-- left -->
                                <div class="flex items-center gap-[10px]">
                                  <!-- <span
                          ><img
                            src="assets/img/icon/lesson-purple.svg"
                            alt="icon"
                        /></span> -->
                                  <span class="text-edblue">
                                    <NuxtLink
                                      :to="`${route.params.course}/${lesson.slug}`"
                                    >
                                      Lesson {{ i + 1 }}:
                                      {{ lesson.title }}</NuxtLink
                                    >
                                  </span>
                                </div>

                                <!-- right -->
                                <div class="flex items-center gap-[10px]">
                                  <button
                                    class="text-[10px] bg-purple-600 rounded-[2px] text-white px-[8px] py-[2.5px]"
                                  >
                                    Preview
                                  </button>
                                  <!-- <span class="icon"
                          ><img src="assets/img/icon/checkmark.svg" alt=""
                        /></span> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="2">
                        <!-- tab 03 -->
                        <div id="instructor" class="ed-tab duration-[400ms]">
                          <div
                            class="flex items-center md:items-start gap-x-[30px] gap-y-[15px] mt-[40px]"
                          >
                            <div class="img shrink-0">
                              <img
                                src="https://static.wixstatic.com/media/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg/v1/fill/w_126,h_126,al_c,lg_1,q_80,enc_auto/a9cbc1_dbd1760011c14f17951d6d337565f926~mv2.jpg"
                                alt="team member image"
                                class="w-[270px] xxs:max-w-full aspect-[74/75] rounded-[12px] object-cover"
                              />
                            </div>

                            <!-- txt -->
                            <div class="txt">
                              <h3
                                class="text-[22px] xxs:text-[20px] font-semibold"
                              >
                                {{ course.instructor }}
                              </h3>
                              <h6 class="text-edgray font-medium text-[16px]">
                                Teacher
                              </h6>
                              <p
                                class="font-normal text-[16px] text-edgray mt-[9px]"
                              >
                                Adipiscing elit. Mauris viverra nisl quis mollis
                                laoreet. Ut eget lacus a felis accumsan pharetra
                                in dignissim enim. In amet odio mollis urna
                                aliquet volutpat. Sed
                              </p>
                              <ul
                                class="infos border-y border-[#E5E5E5] mt-[21px] lg:mt-[18px] mb-[20px] py-[18px] lg:py-[14px] xs:py-[11px] flex flex-wrap gap-x-[40px] xl:gap-x-[20px] gap-y-[10px] text-[16px] text-etBlack"
                              >
                                <li class="text-[16px]">
                                  <span class="font-medium text-purple-500"
                                    >Experience:</span
                                  >
                                  10 Years
                                </li>
                              </ul>

                              <!-- social links -->
                              <div class="flex items-center gap-[16px]">
                                <h6
                                  class="text-purple-500 font-medium text-[16px]"
                                >
                                  Social Media
                                </h6>
                                <div
                                  class="flex gap-[20px] text-[16px] text-edpurple"
                                >
                                  <a href="#" class="hover:text-blue-500"
                                    ><Facebook :stroke-width="1.5" :size="20"
                                  /></a>
                                  <a href="#" class="hover:text-blue-500"
                                    ><Instagram :stroke-width="1.5" :size="20"
                                  /></a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel value="3">
                        <!-- tab 04 -->
                        <div id="reviews" class="ed-tab duration-[400ms]">
                          <div class="ed-course-details-review mt-[40px]">
                            <div
                              class="review-overview flex xxs:flex-col gap-[22px] gap-y-[10px] items-center mb-[42px]"
                            >
                              <!-- average rating area -->
                              <div
                                class="average-rating-area text-center shrink-0"
                              >
                                <h3
                                  class="font-medium text-[50px] leading-[0.7] mb-[14px]"
                                >
                                  4.3
                                </h3>
                                <div class="star text-[#FDA92B] text-[11px]">
                                  <i class="fa-solid fa-sharp fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star"></i>
                                  <i class="fa-solid fa-star-half-stroke"></i>
                                </div>
                                <span
                                  class="rating-amount text-edgray text-[13px]"
                                  >2.33K reviews</span
                                >
                              </div>

                              <!-- review-breakdown by each star  -->
                              <div class="review-breakdown grow xxs:w-full">
                                <ul
                                  class="individual-star-breakdown flex items-center gap-[15px]"
                                >
                                  <li
                                    class="star w-[11px] shrink-0 font-kanit text-edgray text-[16px]"
                                  >
                                    5
                                  </li>
                                  <li
                                    class="bar bg-[#E8EAED] max-w-full w-full h-[12px] rounded-full relative"
                                  >
                                    <div
                                      class="filled bg-[#FDA92B] rounded-[18px] absolute top-0 left-0 h-full w-[80%]"
                                    ></div>
                                  </li>
                                </ul>
                                <ul
                                  class="individual-star-breakdown flex items-center gap-[15px]"
                                >
                                  <li
                                    class="star w-[11px] shrink-0 font-kanit text-edgray text-[16px]"
                                  >
                                    4
                                  </li>
                                  <li
                                    class="bar bg-[#E8EAED] max-w-full w-full h-[12px] rounded-full relative"
                                  >
                                    <div
                                      class="filled bg-[#FDA92B] rounded-[18px] absolute top-0 left-0 h-full w-[90%]"
                                    ></div>
                                  </li>
                                </ul>
                                <ul
                                  class="individual-star-breakdown flex items-center gap-[15px]"
                                >
                                  <li
                                    class="star w-[11px] shrink-0 font-kanit text-edgray text-[16px]"
                                  >
                                    3
                                  </li>
                                  <li
                                    class="bar bg-[#E8EAED] max-w-full w-full h-[12px] rounded-full relative"
                                  >
                                    <div
                                      class="filled bg-[#FDA92B] rounded-[18px] absolute top-0 left-0 h-full w-[40%]"
                                    ></div>
                                  </li>
                                </ul>
                                <ul
                                  class="individual-star-breakdown flex items-center gap-[15px]"
                                >
                                  <li
                                    class="star w-[11px] shrink-0 font-kanit text-edgray text-[16px]"
                                  >
                                    2
                                  </li>
                                  <li
                                    class="bar bg-[#E8EAED] max-w-full w-full h-[12px] rounded-full relative"
                                  >
                                    <div
                                      class="filled bg-[#FDA92B] rounded-[18px] absolute top-0 left-0 h-full w-[30%]"
                                    ></div>
                                  </li>
                                </ul>
                                <ul
                                  class="individual-star-breakdown flex items-center gap-[15px]"
                                >
                                  <li
                                    class="star w-[11px] shrink-0 font-kanit text-edgray text-[16px]"
                                  >
                                    1
                                  </li>
                                  <li
                                    class="bar bg-[#E8EAED] max-w-full w-full h-[12px] rounded-full relative"
                                  >
                                    <div
                                      class="filled bg-[#FDA92B] rounded-[18px] absolute top-0 left-0 h-full w-[5%]"
                                    ></div>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <!-- reviews -->
                            <h4
                              class="font-semibold text-[30px] lg:text-[27px] xs:text-[25px] xxs:text-[23px] mb-[28px]"
                            >
                              Reviews
                            </h4>
                            <div class="user-reviews space-y-[30px]">
                              <!-- single review -->
                              <div
                                class="et-event-details-review flex xxs:flex-col items-start gap-[15px] pb-[30px] border-b border-[#e5e5e5] last:border-none last:pb-0"
                              >
                                <div
                                  class="user-img rounded-full overflow-hidden w-[60px] h-[60px] shrink-0"
                                >
                                  <img
                                    :src="course.image"
                                    alt="user"
                                    class="object-cover w-full max-w-full max-h-full h-full"
                                  />
                                </div>

                                <div>
                                  <div
                                    class="flex items-center justify-between mb-[9px]"
                                  >
                                    <div class="user-info">
                                      <h5
                                        class="user-name font-semibold text-[18px] mb-[4px]"
                                      >
                                        Ronald Richards
                                      </h5>
                                      <h6 class="text-edgray">
                                        February 10, 2024 at 2:37 pm
                                      </h6>
                                    </div>

                                    <div
                                      class="review-rating flex gap-[7px] text-[14px] text-[#FFA41B] shrink-0"
                                    >
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                    </div>
                                  </div>

                                  <div class="review">
                                    <p class="text-edgray leading-[1.8]">
                                      Aenean blandit justo ac rutrum hendrerit.
                                      Vivamus ultrices vulputate ante eget
                                      convallis. Donec id ex ut tellus blandit
                                      aliquet. Morbi varius
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <!-- single review -->
                              <div
                                class="et-event-details-review flex xxs:flex-col items-start gap-[15px] pb-[30px] border-b border-[#e5e5e5] last:border-none last:pb-0"
                              >
                                <div
                                  class="user-img rounded-full overflow-hidden w-[60px] h-[60px] shrink-0"
                                >
                                  <img
                                    :src="course.image"
                                    alt="user"
                                    class="object-cover w-full max-w-full max-h-full h-full"
                                  />
                                </div>

                                <div>
                                  <div
                                    class="flex items-center justify-between mb-[9px]"
                                  >
                                    <div class="user-info">
                                      <h5
                                        class="user-name font-semibold text-[18px] mb-[4px]"
                                      >
                                        Eliza nolan
                                      </h5>
                                      <h6 class="text-edgray">
                                        February 10, 2024 at 2:37 pm
                                      </h6>
                                    </div>

                                    <div
                                      class="review-rating flex gap-[7px] text-[14px] text-[#FFA41B] shrink-0"
                                    >
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                      <i class="fa-solid fa-sharp fa-star"></i>
                                    </div>
                                  </div>

                                  <div class="review">
                                    <p class="text-edgray leading-[1.8]">
                                      Aenean blandit justo ac rutrum hendrerit.
                                      Vivamus ultrices vulputate ante eget
                                      convallis. Donec id ex ut tellus blandit
                                      aliquet. Morbi varius
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </template>
                </Card>
              </div>
            </Tabs>

            <!-- Review Form BLOCK -->
            <Card class="mt-[50px]">
              <template #content>
                <h5 class="font-semibold text-[22px] text-edblue mb-[17px]">
                  Write a Review
                </h5>
                <div
                  class="flex gap-[7px] text-[14px] text-[#FFA319] mb-[14px]"
                >
                  <button><i class="fa-regular fa-star"></i></button>
                  <button><i class="fa-regular fa-star"></i></button>
                  <button><i class="fa-regular fa-star"></i></button>
                  <button><i class="fa-regular fa-star"></i></button>
                  <button><i class="fa-regular fa-star"></i></button>
                </div>

                <form
                  action="#"
                  class="grid grid-cols-2 xxs:grid-cols-1 gap-[30px] xs:gap-[20px] text-[16px]"
                >
                  <div>
                    <label
                      for="ed-course-review-name"
                      class="font-lato font-semibold text-edblue block mb-[12px]"
                      >Your Name*</label
                    >
                    <input
                      type="text"
                      name="name"
                      id="ed-course-review-name"
                      placeholder="Your Name"
                      class="border border-[#ECECEC] h-[55px] px-[20px] xs:px-[15px] rounded-[4px] w-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      for="ed-course-review-email"
                      class="font-lato font-semibold text-edblue block mb-[12px]"
                      >Your Email*</label
                    >
                    <input
                      type="email"
                      name="email"
                      id="ed-course-review-email"
                      placeholder="Your Email"
                      class="border border-[#ECECEC] h-[55px] px-[20px] xs:px-[15px] rounded-[4px] w-full focus:outline-none"
                    />
                  </div>
                  <div class="col-span-2 xxs:col-span-1">
                    <label
                      for="ed-course-review-message"
                      class="font-lato font-semibold text-edblue block mb-[12px]"
                      >Your Message*</label
                    >
                    <textarea
                      name="message"
                      id="ed-course-review-message"
                      placeholder="Your Message"
                      class="border border-[#ECECEC] h-[145px] p-[20px] rounded-[4px] w-full focus:outline-none"
                    ></textarea>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      class="bg-purple-600 text-white hover:bg-edblue"
                    >
                      Post Review
                      <!-- <span class="icon pl-[10px]"
                      ><i class="fa-solid fa-arrow-right-long"></i
                    ></span> -->
                    </Button>
                  </div>
                </form>
              </template>
            </Card>
          </div>
        </div>

        <!-- right sidebar -->
        <div
          class="right h-full sticky top-[60px] max-w-full w-[370px] lg:w-[300px] shrink-0 space-y-[30px]"
        >
          <!-- COURSE INFORMATION -->
          <Card>
            <template #content>
              <h5 class="font-semibold text-[24px] text-edblue mb-[20px]">
                Course includes:
              </h5>

              <ul class="mb-[30px]">
                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/calender-purple.svg" alt="icon"
                /></span> -->
                    <Gauge :stroke-width="1.5" :size="20" />
                    <span>Level:</span>
                  </span>
                  <span class="text-[15px] text-edgray">Beginner</span>
                </li>

                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/clock-purple.svg" alt="icon"
                /></span> -->
                    <Clock :stroke-width="1.5" :size="20" />
                    <span>Duration:</span>
                  </span>
                  <span class="text-[15px] text-edgray">6 Months</span>
                </li>

                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/lesson-purple.svg" alt="icon"
                /></span> -->
                    <NotebookText :stroke-width="1.5" :size="20" />
                    <span>Lessons:</span>
                  </span>
                  <span class="text-[15px] text-edgray">12</span>
                </li>

                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/user-group-purple.svg" alt="icon"
                /></span> -->
                    <UsersRound :stroke-width="1.5" :size="20" />
                    <span>Students:</span>
                  </span>
                  <span class="text-[15px] text-edgray">120</span>
                </li>

                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/medal.svg" alt="icon"
                /></span> -->
                    <Medal :stroke-width="1.5" :size="20" />
                    <span>Certifications:</span>
                  </span>
                  <span class="text-[15px] text-edgray">Yes</span>
                </li>

                <li
                  class="py-[15px] flex flex-wrap gap-[10px] items-center justify-between border-t border-[#e5e5e5] last:border-b"
                >
                  <span
                    class="flex items-center gap-[8px] font-semibold text-edblue"
                  >
                    <!-- <span class="icon"
                  ><img src="assets/img/icon/globe.svg" alt="icon"
                /></span> -->
                    <Globe :stroke-width="1.5" :size="20" />
                    <span>Language:</span>
                  </span>
                  <span class="text-[15px] text-edgray">English</span>
                </li>
              </ul>

              <div class="space-y-[12px]">
                <button
                  class="ed-btn !h-[56px] !rounded-[8px] w-full !bg-transparent border border-edpurple !text-edpurple hover:!bg-purple-600 hover:!text-white"
                >
                  Add to cart
                </button>
                <Button
                  href="#"
                  class="ed-btn gap-[10px] !h-[56px] !rounded-[8px] w-full"
                  >Join this Course
                  <span><i class="fa-solid fa-arrow-right-long"></i></span
                ></Button>
              </div>

              <!-- social links -->
              <!-- <div class="flex gap-[28px] items-center justify-center mt-[22px]">
              <h6 class="font-semibold text-[16px] text-black">Share:</h6>
              <div class="flex gap-[15px] text-[16px]">
                <a href="#" class="text-[#757277] hover:text-edpurple"
                  ><i class="fa-brands fa-facebook-f"></i
                ></a>
                <a href="#" class="text-[#757277] hover:text-edpurple"
                  ><i class="fa-brands fa-twitter"></i
                ></a>
                <a href="#" class="text-[#757277] hover:text-edpurple"
                  ><i class="fa-brands fa-linkedin-in"></i
                ></a>
                <a href="#" class="text-[#757277] hover:text-edpurple"
                  ><i class="fa-brands fa-youtube"></i
                ></a>
              </div>
            </div> -->
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* .hero-arera.course-item-height {
  align-items: center;
  display: flex;
  min-height: 350px;
  position: relative;
  z-index: 2;
  background-repeat: no-repeat;
  background-size: cover;
}
.hero-course-1-text h2 {
  color: #fff;
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 15px;
} */

.p-tabs .p-tablist-tab-list {
  position: relative;
  display: flex;
  background: transparent;
  border-style: solid;
  border-color: var(--p-tabs-tablist-border-color);
  border-width: var(--p-tabs-tablist-border-width);
}
</style>
