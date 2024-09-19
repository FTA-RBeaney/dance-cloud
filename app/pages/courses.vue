<script setup>
const courses = await queryContent('/courses').find();
</script>

<template>
  <div>
    <CourseHeader
      image="https://res.cloudinary.com/dgbn0ttzf/image/upload/v1725362678/alex_hero_cover-min-1024x468_1_p3f8mt.jpg"
    />
    <div class="rbt-section-overlayping-top rbt-section-gapBottom">
      <div class="container">
        <CourseList :courses="courses" />
        <!-- <div class="row">
          <div class="col-lg-12 mt--60">
            <nav>
              <ul class="rbt-pagination">
                <li>
                  <a href="#" aria-label="Previous"
                    ><i class="feather-chevron-left"></i
                  ></a>
                </li>
                <li><a href="#">1</a></li>
                <li class="active"><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li>
                  <a href="#" aria-label="Next"
                    ><i class="feather-chevron-right"></i
                  ></a>
                </li>
              </ul>
            </nav>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
