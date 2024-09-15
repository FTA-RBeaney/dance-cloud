<script setup>
import {
  Mail,
  Award,
  BookOpenText,
  House,
  Gem,
  Rss,
  GraduationCap,
} from "lucide-vue-next";
</script>

<template>
  <div class="rbt-header-wrapper header-space-betwween header-sticky">
    <div class="container-fluid">
      <div class="mainbar-row rbt-navigation-center align-items-center">
        <div class="header-left rbt-header-content">
          <div class="header-info">
            <div class="logo">
              <a href="index.html" class="app-brand-link">
                <span class="app-brand-logo max-w-16">
                  <img
                    src="https://static.wixstatic.com/media/a9cbc1_95139e190a0945b2a7d0ee8f25c76210~mv2.jpg"
                    alt="Jazzerz"
                  />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div class="rbt-main-navigation d-none d-xl-block">
          <nav class="mainmenu-nav">
            <ul class="mainmenu items-center">
              <li class="menu-item">
                <NuxtLink to="/" class="menu-link"
                  ><House class="w-5 h-5 flex-shrink-0 mr-2" /> Home
                </NuxtLink>
              </li>

              <li class="menu-item">
                <NuxtLink to="/plans" class="menu-link"
                  ><Gem class="w-5 h-5 flex-shrink-0 mr-2" /> Plans
                </NuxtLink>
              </li>

              <li class="menu-item">
                <NuxtLink to="/blog" class="menu-link"
                  ><Rss class="w-5 h-5 flex-shrink-0 mr-2" /> Blog
                </NuxtLink>
              </li>
              <li class="menu-item">
                <NuxtLink to="/notion" class="menu-link"
                  ><GraduationCap class="w-5 h-5 flex-shrink-0 mr-2" /> Courses
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>

        <div class="header-right">
          <!-- Navbar Icons -->
          <ul class="quick-access">
            <li class="rbt-user-wrapper d-none d-xl-block">
              <NuxtLink to="/admin" class="flex items-center">
                <Avatar
                  image="https://lh3.googleusercontent.com/a/ACg8ocJPJG2lKugFYNE_AqUNgxT0fR9SJ0aTd3xtQc4jxizLubbmo-id=s96-c"
                  class="!rounded-full overflow-hidden mr-4 h-10 w-10"
                  size="medium"
              /></NuxtLink>
              <!-- <div class="rbt-user-menu-list-wrapper">
                <div class="inner">
                  <div class="rbt-admin-profile">
                    <div class="admin-thumbnail">
                      <img
                        src="https://lh3.googleusercontent.com/a/ACg8ocJPJG2lKugFYNE_AqUNgxT0fR9SJ0aTd3xtQc4jxizLubbmo-id=s96-c"
                        alt="User Images"
                      />
                    </div>
                    <div class="admin-info">
                      <span class="name">Nipa Bali</span>
                      <a class="rbt-btn-link color-primary" href="profile.html"
                        >View Profile</a
                      >
                    </div>
                  </div>
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="instructor-dashboard.html">
                        <i class="feather-home"></i>
                        <span>My Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="feather-bookmark"></i>
                        <span>Bookmark</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-enrolled-courses.html">
                        <i class="feather-shopping-bag"></i>
                        <span>Enrolled Courses</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-wishlist.html">
                        <i class="feather-heart"></i>
                        <span>Wishlist</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-reviews.html">
                        <i class="feather-star"></i>
                        <span>Reviews</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-my-quiz-attempts.html">
                        <i class="feather-list"></i>
                        <span>My Quiz Attempts</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-order-history.html">
                        <i class="feather-clock"></i>
                        <span>Order History</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-quiz-attempts.html">
                        <i class="feather-message-square"></i>
                        <span>Question &amp; Answer</span>
                      </a>
                    </li>
                  </ul>
                  <hr class="mt--10 mb--10" />
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="#">
                        <i class="feather-book-open"></i>
                        <span>Getting Started</span>
                      </a>
                    </li>
                  </ul>
                  <hr class="mt--10 mb--10" />
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="instructor-settings.html">
                        <i class="feather-settings"></i>
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <i class="feather-log-out"></i>
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div> -->
            </li>

            <li class="access-icon rbt-user-wrapper d-block d-xl-none">
              <a class="rbt-round-btn" href="#"><i class="feather-user"></i></a>
              <div class="rbt-user-menu-list-wrapper">
                <div class="inner">
                  <div class="rbt-admin-profile">
                    <div class="admin-thumbnail">
                      <img
                        src="https://lh3.googleusercontent.com/a/ACg8ocJPJG2lKugFYNE_AqUNgxT0fR9SJ0aTd3xtQc4jxizLubbmo-id=s96-c"
                        alt="User Images"
                      />
                    </div>
                    <div class="admin-info">
                      <span class="name">Nipa Bali</span>
                      <a class="rbt-btn-link color-primary" href="profile.html"
                        >View Profile</a
                      >
                    </div>
                  </div>
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="instructor-dashboard.html">
                        <i class="feather-home"></i>
                        <span>My Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="feather-bookmark"></i>
                        <span>Bookmark</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-enrolled-courses.html">
                        <i class="feather-shopping-bag"></i>
                        <span>Enrolled Courses</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-wishlist.html">
                        <i class="feather-heart"></i>
                        <span>Wishlist</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-reviews.html">
                        <i class="feather-star"></i>
                        <span>Reviews</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-my-quiz-attempts.html">
                        <i class="feather-list"></i>
                        <span>My Quiz Attempts</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-order-history.html">
                        <i class="feather-clock"></i>
                        <span>Order History</span>
                      </a>
                    </li>
                    <li>
                      <a href="instructor-quiz-attempts.html">
                        <i class="feather-message-square"></i>
                        <span>Question &amp; Answer</span>
                      </a>
                    </li>
                  </ul>
                  <hr class="mt--10 mb--10" />
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="#">
                        <i class="feather-book-open"></i>
                        <span>Getting Started</span>
                      </a>
                    </li>
                  </ul>
                  <hr class="mt--10 mb--10" />
                  <ul class="user-list-wrapper">
                    <li>
                      <a href="instructor-settings.html">
                        <i class="feather-settings"></i>
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <i class="feather-log-out"></i>
                        <span>Logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          <!-- Start Mobile-Menu-Bar -->
          <div class="mobile-menu-bar d-block d-xl-none">
            <div class="hamberger">
              <button class="hamberger-button rbt-round-btn">
                <i class="feather-menu"></i>
              </button>
            </div>
          </div>
          <!-- Start Mobile-Menu-Bar -->
        </div>
      </div>
    </div>
  </div>
  <!-- <nav class="navbar justify-center bg-base-300">
    <ul class="menu menu-horizontal flex flex-nowrap overflow-x-auto">
      <li>
        <a>
          <House :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Home
        </a>
      </li>
      <li>
        <NuxtLink to="/courses">
          <BookOpenText :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Courses
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/plans">
          <Award :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Plans
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/blog">
          <Rss :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Blog
        </NuxtLink>
      </li>
      <li>
        <a>
          <Mail :stroke-width="1.5" class="w-5 h-5 mr-1" />
          Contact
        </a>
      </li>
    </ul>
  </nav> -->
</template>

<style scoped>
.rbt-main-navigation .router-link-active,
.rbt-main-navigation .router-link-active:hover {
  background: linear-gradient(
    270deg,
    rgba(115, 103, 240, 0.7) 0%,
    #7367f0 100%
  );
  box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.3);
  color: #fff !important;
}
ul {
  padding: 1rem 0;
}
ul .menu-item a {
  display: inline-flex !important;
  border-radius: 0.375rem;
}
.rbt-header .mainmenu-nav .mainmenu > li > a {
  display: block;
  line-height: 1;
  height: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
</style>
