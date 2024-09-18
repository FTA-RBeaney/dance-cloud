// pages/index.vue
<script lang="ts" setup>
const { status, signIn, signOut } = useAuth();
</script>

<template>
  <div class="authentication-wrapper authentication-cover">
    <!-- Logo -->
    <a href="index.html" class="app-brand auth-cover-brand">
      <span class="app-brand-logo demo">
        <svg
          width="32"
          height="22"
          viewBox="0 0 32 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
            fill="#7367F0"
          ></path>
          <path
            opacity="0.06"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
            fill="#161616"
          ></path>
          <path
            opacity="0.06"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
            fill="#161616"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
            fill="#7367F0"
          ></path>
        </svg>
      </span>
      <span class="app-brand-text demo text-heading fw-bold">Vuexy</span>
    </a>
    <!-- /Logo -->
    <div class="authentication-inner row m-0">
      <!-- /Left Text -->
      <div class="d-none d-lg-flex col-lg-8 p-0">
        <div
          class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center"
        >
          <img
            src="https://res.cloudinary.com/dgbn0ttzf/image/upload/v1725362678/alex_hero_cover-min-1024x468_1_p3f8mt.jpg"
            alt="auth-login-cover"
            class="my-5 object-cover h-100"
            data-app-light-img="illustrations/auth-login-illustration-light.png"
            data-app-dark-img="illustrations/auth-login-illustration-dark.png"
          />
        </div>
      </div>
      <!-- /Left Text -->

      <!-- Login -->
      <div
        class="d-flex col-12 col-lg-4 align-items-center authentication-bg p-sm-12 p-6"
      >
        <div class="w-px-400 mx-auto mt-12 pt-5">
          <h4 class="mb-1">Welcome! 👋</h4>
          <p class="mb-1">Please sign-in to your account</p>
          <p class="mb-6">You are currently {{ status }}.</p>

          <div
            id="formAuthentication"
            class="mb-6 fv-plugins-bootstrap5 fv-plugins-framework"
          >
            <!-- <div class="mb-6 fv-plugins-icon-container">
              <label for="email" class="form-label">Email or Username</label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="email-username"
                placeholder="Enter your email or username"
                autofocus=""
              />
              <div
                class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"
              ></div>
            </div>
            <div class="mb-6 form-password-toggle fv-plugins-icon-container">
              <label class="form-label" for="password">Password</label>
              <div class="input-group input-group-merge has-validation">
                <input
                  type="password"
                  id="password"
                  class="form-control"
                  name="password"
                  placeholder="············"
                  aria-describedby="password"
                />
                <span class="input-group-text cursor-pointer"
                  ><i class="ti ti-eye-off"></i
                ></span>
              </div>
              <div
                class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"
              ></div>
            </div>
            <div class="my-8">
              <div class="d-flex justify-content-between">
                <div class="form-check mb-0 ms-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="remember-me"
                  />
                  <label class="form-check-label" for="remember-me">
                    Remember Me
                  </label>
                </div>
                <a href="auth-forgot-password-cover.html">
                  <p class="mb-0">Forgot Password?</p>
                </a>
              </div>
            </div> -->

            <!-- <input type="hidden" /> -->

            <div v-if="status === 'authenticated'">
              <button
                @click="signOut()"
                class="btn btn-primary d-grid w-100 waves-effect waves-light"
              >
                Sign out
              </button>
            </div>
            <div v-else>
              <button
                @click="signIn('github')"
                class="btn btn-primary d-grid w-100 waves-effect waves-light"
              >
                Sign in with GitHub
              </button>
              <button
                @click="signIn('google')"
                class="btn btn-primary d-grid w-100 waves-effect waves-light"
              >
                Sign in with Google
              </button>
            </div>
          </div>

          <p class="text-center">
            <span>New on our platform?</span>
            <a href="auth-register-cover.html">
              <span>Create an account</span>
            </a>
          </p>

          <div class="divider my-6">
            <div class="divider-text">or</div>
          </div>

          <div class="d-flex justify-content-center">
            <a
              href="javascript:;"
              class="btn btn-sm btn-icon rounded-pill btn-text-facebook me-1_5 waves-effect waves-light"
            >
              <i class="tf-icons ti ti-brand-facebook-filled"></i>
            </a>

            <a
              href="javascript:;"
              class="btn btn-sm btn-icon rounded-pill btn-text-twitter me-1_5 waves-effect waves-light"
            >
              <i class="tf-icons ti ti-brand-twitter-filled"></i>
            </a>

            <a
              href="javascript:;"
              class="btn btn-sm btn-icon rounded-pill btn-text-github me-1_5 waves-effect waves-light"
            >
              <i class="tf-icons ti ti-brand-github-filled"></i>
            </a>

            <a
              href="javascript:;"
              class="btn btn-sm btn-icon rounded-pill btn-text-google-plus waves-effect waves-light"
            >
              <i class="tf-icons ti ti-brand-google-filled"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- /Login -->
    </div>
  </div>
</template>

<style scoped>
.authentication-wrapper {
  display: flex;
  flex-basis: 100%;
  min-height: 100vh;
  width: 100%;
}
.authentication-wrapper .authentication-inner {
  width: 100%;
}
.authentication-wrapper.authentication-basic {
  align-items: center;
  justify-content: center;
}
.authentication-wrapper.authentication-basic .card-body {
  padding: 3rem;
}
@media (max-width: 575.98px) {
  .authentication-wrapper.authentication-basic .card-body {
    padding: 2rem;
  }
}
.authentication-wrapper.authentication-cover {
  align-items: flex-start;
}
.authentication-wrapper.authentication-cover .authentication-inner {
  height: 100%;
  margin: auto 0;
}
@media (max-width: 991.98px) {
  .authentication-wrapper.authentication-cover .authentication-inner {
    height: 100vh;
  }
}
.authentication-wrapper.authentication-cover
  .authentication-inner
  .auth-cover-bg {
  width: 100%;
  height: 100vh;
  position: relative;
}
.authentication-wrapper.authentication-cover
  .authentication-inner
  .auth-cover-bg
  .auth-illustration {
  max-height: 65%;
  max-width: 65%;
  z-index: 1;
}
.authentication-wrapper.authentication-cover
  .authentication-inner
  .platform-bg {
  position: absolute;
  width: 100%;
  bottom: 0%;
  left: 0%;
  height: 35%;
}
.authentication-wrapper.authentication-cover
  .authentication-inner
  .auth-multisteps-bg-height {
  height: 100vh;
}
.authentication-wrapper.authentication-cover
  .authentication-inner
  .auth-multisteps-bg-height
  > img:first-child {
  z-index: 1;
}
.authentication-wrapper.authentication-basic .authentication-inner {
  max-width: 460px;
  position: relative;
}
.authentication-wrapper.authentication-basic .authentication-inner:before {
  width: 238px;
  height: 233px;
  content: ' ';
  position: absolute;
  top: -35px;
  left: -45px;
  background-image: url("data:image/svg+xml,%3Csvg width='239' height='234' viewBox='0 0 239 234' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='88.5605' y='0.700195' width='149' height='149' rx='19.5' stroke='%237367F0' stroke-opacity='0.16'/%3E%3Crect x='0.621094' y='33.761' width='200' height='200' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E%0A");
}
@media (max-width: 575.98px) {
  .authentication-wrapper.authentication-basic .authentication-inner:before {
    display: none;
  }
}
.authentication-wrapper.authentication-basic .authentication-inner:after {
  width: 180px;
  height: 180px;
  content: ' ';
  position: absolute;
  z-index: -1;
  bottom: -30px;
  right: -56px;
  background-image: url("data:image/svg+xml,%3Csvg width='181' height='181' viewBox='0 0 181 181' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='1.30469' y='1.44312' width='178' height='178' rx='19' stroke='%237367F0' stroke-opacity='0.16' stroke-width='2' stroke-dasharray='8 8'/%3E%3Crect x='22.8047' y='22.9431' width='135' height='135' rx='10' fill='%237367F0' fill-opacity='0.08'/%3E%3C/svg%3E");
}
@media (max-width: 575.98px) {
  .authentication-wrapper.authentication-basic .authentication-inner:after {
    display: none;
  }
}
.authentication-wrapper .auth-input-wrapper .auth-input {
  max-width: 50px;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  font-size: 150%;
}

@media (max-height: 636px) {
  .auth-multisteps-bg-height {
    height: 100% !important;
  }
}
@media (max-width: 575.98px) {
  .authentication-wrapper .auth-input-wrapper .auth-input {
    font-size: 1.125rem;
  }
}
#twoStepsForm .fv-plugins-bootstrap5-row-invalid .form-control {
  border-color: #ff4c51;
  border-width: 2px;
}

@media (max-width: 575.98px) {
  .numeral-mask-wrapper .numeral-mask {
    padding: 0 !important;
  }
  .numeral-mask {
    margin-inline: 1px !important;
  }
}
.light-style .authentication-wrapper .authentication-bg {
  background-color: #fff;
}
.light-style .auth-cover-bg-color {
  background-color: #f8f7fa;
}

.dark-style .authentication-wrapper .authentication-bg {
  background-color: #2f3349;
}
.dark-style .auth-cover-bg-color {
  background-color: #25293c;
}
</style>
