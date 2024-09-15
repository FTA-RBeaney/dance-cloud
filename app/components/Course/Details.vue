<script setup>
import { CirclePlay, Eye, Minus, ChevronRight } from "lucide-vue-next";
const courses = await queryContent("/courses").find();
const route = useRoute();
const props = defineProps({
  course: Object,
});

const visible = ref();
const video = ref(null);

const onHoverEnter = () => {
  video.value.play();
};

const onHoverLeave = () => {
  video.value.pause();
};
</script>
<template>
  <div class="rbt-course-details-area">
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
                  {{ course?.description || "" }}
                </p>
              </div>
            </div>
            <!-- End Course Feature Box  -->

            <!-- Start Course Content  -->
            <div
              class="course-content rbt-shadow-box coursecontent-wrapper mt--30"
              id="coursecontent"
            >
              <div class="rbt-course-feature-inner">
                <div class="section-title">
                  <h4 class="rbt-title-style-3">Course Content</h4>
                </div>
                <div class="rbt-accordion-style rbt-accordion-02 accordion">
                  <div class="accordion" id="accordionExampleb2">
                    <div
                      class="accordion-item card"
                      v-for="(section, i) in course.sections"
                      :key="`section${i}`"
                    >
                      <h2 class="accordion-header card-header" id="headingTwo1">
                        <button
                          class="flex justify-between w-full"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo1"
                          aria-expanded="true"
                          aria-controls="collapseTwo1"
                        >
                          {{ section.title }}
                          <span class="rbt-badge-5 ml--10">1hr 30min</span>
                          <!-- <Minus class="self-end" /> -->
                        </button>
                      </h2>
                      <div
                        id="collapseTwo1"
                        class="accordion-collapse show"
                        aria-labelledby="headingTwo1"
                        data-bs-parent="#accordionExampleb2"
                      >
                        <div class="accordion-body card-body pr--0">
                          <ul class="rbt-course-main-content liststyle">
                            <li
                              v-for="(lesson, i) in section.lessons"
                              :key="`lesson${i}`"
                            >
                              <NuxtLink
                                :to="`${route.params.course}/${lesson.slug}`"
                              >
                                <div class="course-content-left">
                                  <CirclePlay
                                    :stroke-width="1.5"
                                    class="w-6 mr-2"
                                  />
                                  <span class="text">
                                    Lesson {{ i + 1 }}: {{ lesson.title }}</span
                                  >
                                </div>
                                <div
                                  class="course-content-right !flex items-center"
                                >
                                  <span class="min-lable">30 min</span>
                                  <span
                                    class="rbt-badge variation-03 bg-primary-opacity !flex items-center"
                                    ><Eye
                                      :stroke-width="1.5"
                                      class="w-6 mr-2"
                                    />
                                    Watch</span
                                  >
                                </div>
                              </NuxtLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- End Course Content  -->

            <!-- Start Course Feature Box  -->
            <div
              class="rbt-course-feature-box rbt-shadow-box details-wrapper mt--30"
              id="details"
            >
              <div class="row g-5">
                <!-- Start Feture Box  -->
                <div class="col-lg-6">
                  <div class="section-title">
                    <h4 class="rbt-title-style-3 mb--20">Requirements</h4>
                  </div>
                  <ul class="rbt-list-style-1">
                    <li>
                      <i class="feather-check"></i>Become an advanced,
                      confident, and modern JavaScript developer from scratch.
                    </li>
                    <li>
                      <i class="feather-check"></i>Have an intermediate skill
                      level of Python programming.
                    </li>
                    <li>
                      <i class="feather-check"></i>Have a portfolio of various
                      data analysis projects.
                    </li>
                    <li>
                      <i class="feather-check"></i>Use the numpy library to
                      create and manipulate arrays.
                    </li>
                  </ul>
                </div>
                <!-- End Feture Box  -->

                <!-- Start Feture Box  -->
                <div class="col-lg-6">
                  <div class="section-title">
                    <h4 class="rbt-title-style-3 mb--20">Description</h4>
                  </div>
                  <ul class="rbt-list-style-1">
                    <li>
                      <i class="feather-check"></i>Use the Jupyter Notebook
                      Environment. JavaScript developer from scratch.
                    </li>
                    <li>
                      <i class="feather-check"></i>Use the pandas module with
                      Python to create and structure data.
                    </li>
                    <li>
                      <i class="feather-check"></i>Have a portfolio of various
                      data analysis projects.
                    </li>
                    <li>
                      <i class="feather-check"></i>Create data visualizations
                      using matplotlib and the seaborn.
                    </li>
                  </ul>
                </div>
                <!-- End Feture Box  -->
              </div>
            </div>
            <!-- End Course Feature Box  -->

            <!-- Start Intructor Area  -->
            <!-- <div
              class="rbt-instructor rbt-shadow-box intructor-wrapper mt--30"
              id="intructor"
            >
              <div class="about-author border-0 pb--0 pt--0">
                <div class="section-title mb--30">
                  <h4 class="rbt-title-style-3">Instructor</h4>
                </div>
                <div class="media align-items-center">
                  <div class="thumbnail">
                    <a href="#">
                      <img
                        src="https://placehold.co/600x400"
                        alt="Author Images"
                      />
                    </a>
                  </div>
                  <div class="media-body">
                    <div class="author-info">
                      <h5 class="title">
                        <a class="hover-flip-item-wrapper" href="author.html"
                          >B.M. Rafekul Islam</a
                        >
                      </h5>
                      <span class="b3 subtitle">Advanced Educator</span>
                      <ul class="rbt-meta mb--20 mt--10">
                        <li>
                          <i class="fa fa-star color-warning"></i>75,237 Reviews
                          <span class="rbt-badge-5 ml--5">4.4 Rating</span>
                        </li>
                        <li><i class="feather-users"></i>912,970 Students</li>
                        <li>
                          <a href="#"
                            ><i class="feather-video"></i>16 Courses</a
                          >
                        </li>
                      </ul>
                    </div>
                    <div class="content">
                      <p class="description">
                        John is a brilliant educator, whose life was spent for
                        computer science and love of nature.
                      </p>

                      <ul
                        class="social-icon social-default icon-naked justify-content-start"
                      >
                        <li>
                          <a href="https://www.facebook.com/">
                            <i class="feather-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.twitter.com">
                            <i class="feather-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">
                            <i class="feather-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkdin.com/">
                            <i class="feather-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- End Intructor Area  -->

            <!-- <div
              class="about-author-list rbt-shadow-box featured-wrapper mt--30 has-show-more"
            >
              <div class="section-title">
                <h4 class="rbt-title-style-3">Featured review</h4>
              </div>
              <div
                class="has-show-more-inner-content rbt-featured-review-list-wrapper"
              >
                <div class="rbt-course-review about-author">
                  <div class="media">
                    <div class="thumbnail">
                      <a href="#">
                        <img
                          src="https://placehold.co/600x400"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="author-info">
                        <h5 class="title">
                          <a class="hover-flip-item-wrapper" href="#">
                            Farjana Bawnia
                          </a>
                        </h5>
                        <div class="rating">
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                        </div>
                      </div>
                      <div class="content">
                        <p class="description">
                          At 29 years old, my favorite compliment is being told
                          that I look like my mom. Seeing myself in her image,
                          like this daughter up top.
                        </p>
                        <ul
                          class="social-icon social-default transparent-with-border justify-content-start"
                        >
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-up"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-down"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rbt-course-review about-author">
                  <div class="media">
                    <div class="thumbnail">
                      <a href="#">
                        <img
                          src="https://placehold.co/600x400"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="author-info">
                        <h5 class="title">
                          <a class="hover-flip-item-wrapper" href="#"
                            >Razwan Islam</a
                          >
                        </h5>
                        <div class="rating">
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                        </div>
                      </div>
                      <div class="content">
                        <p class="description">
                          My favorite compliment is being told that I look like
                          my mom. Seeing myself in her image, like this daughter
                          up top.
                        </p>
                        <ul
                          class="social-icon social-default transparent-with-border justify-content-start"
                        >
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-up"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-down"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rbt-course-review about-author">
                  <div class="media">
                    <div class="thumbnail">
                      <a href="#">
                        <img
                          src="https://placehold.co/600x400"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="author-info">
                        <h5 class="title">
                          <a class="hover-flip-item-wrapper" href="#"
                            >Babor Azom</a
                          >
                        </h5>
                        <div class="rating">
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                        </div>
                      </div>
                      <div class="content">
                        <p class="description">
                          My favorite compliment is being told that I look like
                          my mom. Seeing myself in her image, like this daughter
                          up top.
                        </p>
                        <ul
                          class="social-icon social-default transparent-with-border justify-content-start"
                        >
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-up"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-down"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rbt-course-review about-author">
                  <div class="media">
                    <div class="thumbnail">
                      <a href="#">
                        <img
                          src="https://placehold.co/600x400"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="author-info">
                        <h5 class="title">
                          <a class="hover-flip-item-wrapper" href="#"
                            >Mohammad Ali</a
                          >
                        </h5>
                        <div class="rating">
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                        </div>
                      </div>
                      <div class="content">
                        <p class="description">
                          My favorite compliment is being told that I look like
                          my mom. Seeing myself in her image, like this daughter
                          up top.
                        </p>
                        <ul
                          class="social-icon social-default transparent-with-border justify-content-start"
                        >
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-up"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-down"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="rbt-course-review about-author">
                  <div class="media">
                    <div class="thumbnail">
                      <a href="#">
                        <img
                          src="https://placehold.co/600x400"
                          alt="Author Images"
                        />
                      </a>
                    </div>
                    <div class="media-body">
                      <div class="author-info">
                        <h5 class="title">
                          <a class="hover-flip-item-wrapper" href="#"
                            >Sakib Al Hasan</a
                          >
                        </h5>
                        <div class="rating">
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                          <a href="#"><i class="fa fa-star"></i></a>
                        </div>
                      </div>
                      <div class="content">
                        <p class="description">
                          My favorite compliment is being told that I look like
                          my mom. Seeing myself in her image, like this daughter
                          up top.
                        </p>
                        <ul
                          class="social-icon social-default transparent-with-border justify-content-start"
                        >
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-up"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i class="feather-thumbs-down"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="rbt-show-more-btn">Show More</div>
            </div> -->
          </div>
        </div>

        <div class="col-lg-4">
          <div
            class="course-sidebar sticky-top rbt-shadow-box course-sidebar-top shadow"
          >
            <div class="inner">
              <!-- Start Viedo Wrapper  -->

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
                :header="course.sections[0].lessons[0].title"
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
              <!-- End Viedo Wrapper  -->

              <div class="content-item-content">
                <div
                  class="rbt-price-wrapper d-flex flex-wrap align-items-center justify-content-between"
                >
                  <div class="rbt-price">
                    <span class="current-price">$60.99</span>
                    <span class="off-price">$84.99</span>
                  </div>
                  <div class="discount-time">
                    <span class="rbt-badge color-danger bg-color-danger-opacity"
                      ><i class="feather-clock"></i> 3 days left!</span
                    >
                  </div>
                </div>

                <div class="add-to-card-button mt--15">
                  <NuxtLink
                    class="rbt-btn btn-gradient icon-hover w-100 d-block text-center"
                    :to="`${route.params.course}/${course.sections[0].lessons[0].slug}`"
                  >
                    <span class="btn-text">Start course</span>
                    <span class="btn-icon"><ChevronRight class="h-4" /></span>
                  </NuxtLink>
                </div>

                <!-- <div class="buy-now-btn mt--15">
                  <a
                    class="rbt-btn btn-border icon-hover w-100 d-block text-center"
                    href="#"
                  >
                    <span class="btn-text">Buy Now</span>
                    <span class="btn-icon"
                      ><i class="feather-arrow-right"></i
                    ></span>
                  </a>
                </div> -->

                <span class="subtitle"
                  ><i class="feather-rotate-ccw"></i> 30-Day Money-Back
                  Guarantee</span
                >

                <div class="rbt-widget-details">
                  <ul class="rbt-course-details-list-wrapper">
                    <li>
                      <span>Number of videos</span
                      ><span class="rbt-feature-value rbt-badge-5">{{
                        course.sections[0].lessons.length
                      }}</span>
                    </li>
                    <li>
                      <span>Enrolled</span
                      ><span class="rbt-feature-value rbt-badge-5">100</span>
                    </li>
                    <li>
                      <span>Skill Level</span
                      ><span class="rbt-feature-value rbt-badge-5">Basic</span>
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
        <CourseList :courses="courses" />
      </div>
    </div>
  </div>

  <div class="rbt-separator-mid">
    <div class="container">
      <hr class="rbt-separator m-0" />
    </div>
  </div>
</template>

<style scoped>
.rbt-accordion-style.rbt-accordion-02 .card .card-header {
  padding-right: 0;
}
.rbt-accordion-style .card .card-header button::before {
  content: none;
}
.course-sidebar-top {
  margin-top: -230px;
}

.accordion:not(.accordion-bordered) > .card.accordion-item {
  box-shadow: none;
}

.rbt-btn {
  padding: 0 26px;
  background: var(--color-primary);
  height: 60px;
  line-height: 60px;
  color: var(--color-white);
  font-size: 16px;
  letter-spacing: 0.5px;
  font-weight: 500;
  display: inline-block;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease-in-out;
  border-radius: 6px;
  border: 0 none;
  outline: none;

  &.btn-secondary {
    background: var(--color-secondary);

    &:hover {
      background: var(--color-primary);
    }
  }

  &.btn-coral {
    background: var(--color-coral);

    &:hover {
      background: var(--color-primary);
    }
  }

  &.btn-violet {
    background: var(--color-violet);

    &:hover {
      background: var(--color-primary);
    }
  }

  &.btn-pink {
    background: var(--color-pink);
    &:hover {
      background: var(--color-primary);
    }
  }

  &.btn-white {
    box-shadow: var(--shadow-1);
    background: var(--color-white);
    color: var(--color-heading);

    &:hover {
      background: var(--color-primary);
      color: var(--color-white);
    }
  }

  &.btn-border {
    background: transparent;
    border: 2px solid var(--color-border);
    color: var(--color-heading);
    line-height: 57px;
    &:hover {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }

    &.color-white-off {
      border-color: var(--color-border-2);
      color: var(--color-white-off);
      &:hover {
        border-color: var(--color-primary);
        color: var(--color-white);
      }
    }
  }

  &.btn-gradient {
    color: var(--color-white);
    background-size: 300% 100%;
    background-image: linear-gradient(
      to right,
      var(--color-primary),
      var(--color-secondary),
      var(--color-secondary),
      var(--color-primary)
    );

    &.btn-gradient-2 {
      background-image: linear-gradient(
        to right,
        var(--color-pink),
        var(--color-violet),
        var(--color-violet),
        var(--color-pink)
      );
    }

    &.btn-gradient-3 {
      background-image: linear-gradient(
        to right,
        var(--color-secondary),
        var(--color-primary),
        var(--color-primary),
        var(--color-secondary)
      );
    }

    &:hover {
      background-color: inherit;
      background-position: 102% 0;
      transition: all 0.4s ease-in-out;
    }
  }

  &.rbt-marquee-btn {
    overflow: hidden;
    span {
      display: inline-flex;
      position: relative;
      z-index: 3;
      line-height: 1.2;
      &::after {
        content: attr(data-text);
        position: absolute;
        white-space: nowrap;
        top: 50%;
        left: 100%;
        transform: translate(100%, -50%);
      }
    }

    &.marquee-text-y {
      span {
        &::after {
          top: 100%;
          left: 50%;
          transform: translate(-50%, 100%);
        }
      }
    }

    &.marquee-auto {
      span {
        animation: btnTxtMarqueeX 2s linear infinite;
      }
    }
  }

  &.rbt-switch-btn {
    overflow: hidden;
    span {
      display: inline-flex;
      position: relative;
      z-index: 3;
      transition:
        opacity 0.65s,
        transform 0.85s;
      transition-timing-function: cubic-bezier(0.15, 0.85, 0.31, 1);
      &::after {
        content: attr(data-text);
        display: inline-block;
        position: absolute;
        white-space: nowrap;
        top: 50%;
        opacity: 0;
        transition: inherit;
        left: 100%;
        transform: translate(50%, -50%);
      }
    }
    &.rbt-switch-y {
      span {
        &::after {
          left: 50%;
          transform: translate(-50%, 100%);
        }
      }
    }
  }

  &.icon-hover {
    .btn-text {
      transition-timing-function: cubic-bezier(0, 0.71, 0.4, 1);
      display: inline-block;
      transition: transform 0.5s;
      transform: translateX(7px);
    }
    .btn-icon {
      margin-inline-start: -7px;
      display: inline-flex;
      svg {
        transition-timing-function: cubic-bezier(0, 0.71, 0.4, 1);
        display: inline-block;
        opacity: 0;
        transform: translateX(-7px);
        transition:
          opacity 0.25s,
          transform 0.5s;
        padding-left: 0;
      }
    }
    &.icon-hover-left {
      .btn-text {
        transform: translateX(-7px);
      }

      .btn-icon {
        margin-inline-start: 0;
        margin-inline-end: -7px;
        svg {
          transform: translateX(7px);
        }
      }

      &:hover {
        .btn-icon {
          svg {
            transform: translateX(-7px);
          }
        }
        .btn-text {
          transform: translateX(7px);
        }
      }
    }
  }

  &.hover-icon-reverse {
    .icon-reverse-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .btn-text {
      display: inline-block;
      transition: transform 0.6s 0.125s cubic-bezier(0.1, 0.75, 0.25, 1);
      margin-inline-start: -23px;
    }

    .btn-icon {
      display: inline-block;
      transition:
        opacity 0.4s 0.25s,
        transform 0.6s 0.25s;
      transition-timing-function: cubic-bezier(0.1, 0.75, 0.25, 1);

      & + .btn-icon {
        margin-inline-end: 0;
        margin-inline-start: 8px;
        display: inline-block;
        margin-inline-start: 0;
        margin-inline-end: 0;
        opacity: 0;
        transform: translateX(-10px);
        transition-delay: 0s;
        order: -2;

        svg {
          padding-left: 0;
          padding-right: 6px;
        }
      }
    }
  }

  &.rounded-player {
    border-radius: 100%;
    width: 100px;
    height: 100px;
    padding: 0;
    line-height: 100px;
    display: inline-block;
    position: relative;

    span {
      display: inline-block;
      svg {
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 30px;
      }
    }

    &.border {
      background-image: inherit;
      border-color: var(--color-white) !important;
      border-width: 2px !important;
      &:hover {
        background-color: var(--color-secondary);
        border-color: var(--color-secondary) !important;
      }
    }

    &.sm-size {
      width: 70px;
      height: 70px;
      line-height: 70px;
    }

    &:focus {
      outline: none;
      color: var(--color-white);
    }

    &:hover {
      transform: scale(1.1);
      background: var(--color-primary);
    }
  }

  &.rounded-player-2 {
    border: 0;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    transition: all 1s cubic-bezier(0, 0, 0.2, 1);
    position: relative;
    border-radius: 100%;
    background: var(--color-white);
    margin: 0 auto;
    display: inline-block;
    padding: 0;

    .play-icon {
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        transform: translate(-6px, -9px);
        border-top: 9px solid transparent;
        border-bottom: 9px solid transparent;
        border-left: 15px solid var(--color-primary);
      }
    }

    &.btn-large {
      width: 60px;
      height: 60px;
      margin-left: 0;
      margin-top: 0;
    }

    &.sm-size {
      width: 70px;
      height: 70px;
      line-height: 70px;
    }

    &.btn-theme-color {
      background: var(--color-primary);
      &::after {
        border-color: var(--color-primary);
      }
      &::before {
        border-color: var(--color-primary);
      }
      .play-icon {
        &::before {
          border-left: 15px solid var(--color-white);
        }
      }
      &:hover {
        color: inherit;
        background: var(--color-primary);
      }
    }

    &:hover {
      color: inherit;
      background: var(--color-white);
    }
  }

  &.with-animation {
    &::after,
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      z-index: -1;
      bottom: 0;
      left: 0;
      -webkit-transition: var(--transition);
      transition: var(--transition);
      border-radius: 50%;
      border: 1.5px solid var(--color-white);
    }
    &::before {
      -webkit-animation: ripple 2s linear infinite;
      animation: ripple 2s linear infinite;
    }

    &::after {
      -webkit-animation: ripple 2s linear 1s infinite;
      animation: ripple 2s linear 1s infinite;
    }
  }

  &:hover {
    background-color: var(--color-secondary);
    color: var(--color-white);
    transform: translate3d(0, -2px, 0);
    box-shadow: var(--shadow-7);

    &.icon-hover {
      .btn-text {
        transform: translateX(-7px);
      }
      .btn-icon {
        svg {
          opacity: 1;
          transform: translateX(7px);
        }
      }
    }

    &.hover-icon-reverse {
      .btn-text {
        transition-delay: 0.1s;
        transform: translateX(23px);
      }
      .btn-icon {
        opacity: 0;
        transition-delay: 0s;
        transform: translateX(10px);
        & + .btn-icon {
          opacity: 1;
          transform: translateX(0);
          transition-delay: 0.225s;
        }
      }
    }
  }

  &:hover {
    &.rbt-switch-btn {
      span {
        transform: translateX(-200%);
        &::after {
          opacity: 1;
          transform: translate(100%, -50%);
        }
      }

      &.rbt-switch-y {
        span {
          transform: translateY(-200%);
          &::after {
            transform: translate(-50%, 150%);
          }
        }
      }
    }

    &.rbt-marquee-btn {
      span {
        animation: btnTxtMarqueeX 2s linear infinite;
      }
      &.marquee-text-y {
        span {
          animation: btnTxtMarqueeY 0.5s linear infinite;
        }
      }
    }
  }

  &.btn-xs {
    padding: 0 14px;
    font-size: var(--font-size-b3);
    height: 30px;
    line-height: 29px;
    font-size: 14px;
  }

  &.btn-sm {
    padding: 0 22px;
    font-size: var(--font-size-b3);
    height: 45px;
    line-height: 43px;
  }
  &.btn-md {
    padding: 0 25px;
    font-size: var(--font-size-b3);
    height: 50px;
    line-height: 48px;
  }

  &.btn-lg {
    height: 70px;
    line-height: 70px;
    padding: 0 35px;
    font-size: 18px;
  }

  &.btn-xl {
    padding: 0 45px;
    font-size: 20px;
    height: 75px;
    line-height: 75px;
  }

  &.btn-xxl {
    padding: 0 60px;
    font-size: 22px;
    height: 100px;
    line-height: 100px;
  }

  svg {
    padding-left: 6px;
    display: inline-block;
    top: 2px;
    position: relative;
    font-size: 17px;

    &.image-icon {
      top: inherit;
      transition: 0.4s;
    }
  }

  &.btn-border-gradient {
    background: linear-gradient(90deg, #cfa2e8, #637fea);
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    z-index: 10;
    color: var(--color-heading);
    box-shadow: 0 10px 13px 0 rgba(209, 211, 237, 0.39);
    border-radius: 0;
    &::before {
      content: "";
      z-index: -1;
      top: 3px;
      left: 3px;
      position: absolute;
      background: #fff;
      width: calc(100% - 6px);
      height: calc(100% - 6px);
    }

    &.radius-round {
      border-radius: 500px;
      &::before {
        border-radius: 500px;
      }
    }
  }

  &.hover-transform-none {
    &:hover {
      transform: none;
    }
  }
}
</style>
