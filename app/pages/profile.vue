<script setup>
import {
  MapPin,
  CalendarDays,
  UserCheck,
  Activity,
  User,
  Check,
  Globe,
} from 'lucide-vue-next';
const { data } = useAuth();

const userImage = computed(() => data.value.user.image);

let date = new Date(data.value.user.test);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}

const memberSince = `${dt}/${month}/${year}`;

const membershipLevel = computed(() => {
  if (data?.value?.user?.plan === 'tier-yearly') {
    return 'Yearly';
  } else if (data?.value?.user?.plan === 'tier-monthly') {
    return 'Monthly';
  } else {
    return 'Free';
  }
});
</script>

<template>
  <div class="container-xxl flex-grow-1 container-p-y">
    <pre>{{ data }}</pre>
    <!-- Header -->
    <div class="row">
      <div class="col-12">
        <div class="card mb-6">
          <div class="user-profile-header-banner">
            <img
              src="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banner image"
              class="rounded-top object-cover w-full"
            />
          </div>
          <div
            class="user-profile-header d-flex flex-column flex-lg-row text-sm-start text-center mb-3"
          >
            <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
              <img
                :src="userImage"
                alt="user image"
                class="d-block h-auto ms-0 ms-sm-6 rounded user-profile-img object-cover w-full"
              />
            </div>
            <div class="flex-grow-1 mt-3 mt-lg-5">
              <div
                class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-3 flex-md-row flex-column gap-4"
              >
                <div class="user-profile-info">
                  <h4 class="mb-1 mt-lg-1 text-xl font-semibold">
                    {{ data.user.name }}
                  </h4>
                  <ul
                    class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-4 my-2"
                  >
                    <!-- <li
                      class="list-inline-item d-flex gap-2 align-items-center"
                    >
                      <i class="ti ti-palette ti-lg"></i
                      ><span class="fw-medium">UX Designer</span>
                    </li> -->
                    <li
                      class="list-inline-item d-flex gap-2 align-items-center"
                    >
                      <MapPin :stroke-width="1.5" />
                      <span class="fw-medium">London. England</span>
                    </li>
                    <li
                      class="list-inline-item d-flex gap-2 align-items-center"
                    >
                      <CalendarDays :stroke-width="1.5" />
                      <span class="fw-medium">
                        Member since: {{ memberSince }}</span
                      >
                    </li>
                  </ul>
                </div>
                <a
                  href="javascript:void(0)"
                  class="btn btn-primary mb-1 waves-effect waves-light"
                  :class="{
                    '!bg-indigo-500':
                      data?.user?.plan?.includes('tier-monthly'),
                    '!bg-red-500': data?.user?.plan?.includes('tier-free'),
                    '!bg-green-500': data?.user?.plan?.includes('tier-yearly'),
                  }"
                >
                  <UserCheck :stroke-width="1.5" class="mr-2" />{{
                    membershipLevel
                  }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ Header -->

    <!-- Navbar pills -->
    <div class="row">
      <div class="col-md-12">
        <div class="nav-align-top">
          <ul class="nav nav-pills flex-column flex-sm-row mb-6 gap-2 gap-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active waves-effect waves-light"
                href="javascript:void(0);"
                ><i class="ti-sm ti ti-user-check me-1_5"></i> Profile</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link waves-effect waves-light"
                href="pages-profile-teams.html"
                ><i class="ti-sm ti ti-users me-1_5"></i> Teams</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link waves-effect waves-light"
                href="pages-profile-projects.html"
                ><i class="ti-sm ti ti-layout-grid me-1_5"></i> Projects</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link waves-effect waves-light"
                href="pages-profile-connections.html"
                ><i class="ti-sm ti ti-link me-1_5"></i> Connections</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--/ Navbar pills -->

    <!-- User Profile Content -->
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-5">
        <!-- About User -->
        <div class="card mb-6">
          <div class="card-body">
            <small class="card-text text-uppercase text-muted small"
              >About</small
            >
            <ul class="list-unstyled my-3 py-1 text-sm">
              <li class="d-flex align-items-center mb-4">
                <Check :stroke-width="1.5" />
                <span class="fw-medium mx-2">Full Name:</span>
                <span>{{ data?.user?.name }}</span>
              </li>
              <li class="d-flex align-items-center mb-4">
                <User :stroke-width="1.5" />
                <span class="fw-medium mx-2">Status:</span>
                <span>{{
                  data?.user?.isSubscribed ? 'Subscribed' : 'Not subscribed'
                }}</span>
              </li>

              <li class="d-flex align-items-center mb-4">
                <MapPin :stroke-width="1.5" />
                <span class="fw-medium mx-2">Country:</span>
                <span>London, England</span>
              </li>
              <li class="d-flex align-items-center mb-2">
                <Globe :stroke-width="1.5" /><span class="fw-medium mx-2"
                  >Languages:</span
                >
                <span>English</span>
              </li>
            </ul>
            <small class="card-text text-uppercase text-muted small"
              >Contacts</small
            >
            <ul class="list-unstyled my-3 py-1 text-sm">
              <li class="d-flex align-items-center mb-4">
                <i class="ti ti-phone-call ti-lg"></i
                ><span class="fw-medium mx-2">Contact:</span>
                <span>(123) 456-7890</span>
              </li>
              <li class="d-flex align-items-center mb-4">
                <i class="ti ti-messages ti-lg"></i
                ><span class="fw-medium mx-2">Skype:</span>
                <span>john.doe</span>
              </li>
              <li class="d-flex align-items-center mb-4">
                <i class="ti ti-mail ti-lg"></i
                ><span class="fw-medium mx-2">Email:</span>
                <span>john.doe@example.com</span>
              </li>
            </ul>
            <small class="card-text text-uppercase text-muted small"
              >Teams</small
            >
            <ul class="list-unstyled mb-0 mt-3 pt-1">
              <li class="d-flex flex-wrap mb-4">
                <span class="fw-medium me-2">Backend Developer</span
                ><span>(126 Members)</span>
              </li>
              <li class="d-flex flex-wrap">
                <span class="fw-medium me-2">React Developer</span
                ><span>(98 Members)</span>
              </li>
            </ul>
          </div>
        </div>
        <!--/ About User -->
        <!-- Profile Overview -->
        <div class="card mb-6">
          <div class="card-body">
            <small class="card-text text-uppercase text-muted small"
              >Overview</small
            >
            <ul class="list-unstyled mb-0 mt-3 pt-1">
              <li class="d-flex align-items-end mb-4">
                <i class="ti ti-check ti-lg"></i
                ><span class="fw-medium mx-2">Task Compiled:</span>
                <span>13.5k</span>
              </li>
              <li class="d-flex align-items-end mb-4">
                <i class="ti ti-layout-grid ti-lg"></i
                ><span class="fw-medium mx-2">Projects Compiled:</span>
                <span>146</span>
              </li>
              <li class="d-flex align-items-end">
                <i class="ti ti-users ti-lg"></i
                ><span class="fw-medium mx-2">Connections:</span>
                <span>897</span>
              </li>
            </ul>
          </div>
        </div>
        <!--/ Profile Overview -->
      </div>
      <div class="col-xl-8 col-lg-7 col-md-7">
        <!-- Activity Timeline -->
        <div class="card card-action mb-6">
          <div class="card-header align-items-center">
            <h5 class="card-action-title mb-0 flex">
              <Activity :stroke-width="1.5" class="mr-4" /> Activity Timeline
            </h5>
          </div>
          <div class="card-body pt-3">
            <ul class="timeline mb-0">
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-primary"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-3">
                    <h6 class="mb-0">12 Invoices have been paid</h6>
                    <small class="text-muted">12 min ago</small>
                  </div>
                  <p class="mb-2">Invoices have been paid to the company</p>
                  <div class="d-flex align-items-center mb-2">
                    <div
                      class="badge bg-lighter rounded d-flex align-items-center"
                    >
                      <img
                        src="../../assets//img/icons/misc/pdf.png"
                        alt="img"
                        width="15"
                        class="me-2"
                      />
                      <span class="h6 mb-0 text-body">invoices.pdf</span>
                    </div>
                  </div>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-3">
                    <h6 class="mb-0">Client Meeting</h6>
                    <small class="text-muted">45 min ago</small>
                  </div>
                  <p class="mb-2">Project meeting with john @10:15am</p>
                  <div
                    class="d-flex justify-content-between flex-wrap gap-2 mb-2"
                  >
                    <div class="d-flex flex-wrap align-items-center mb-50">
                      <div class="avatar avatar-sm me-3">
                        <img
                          src="../../assets/img/avatars/1.png"
                          alt="Avatar"
                          class="rounded-circle"
                        />
                      </div>
                      <div>
                        <p class="mb-0 small fw-medium">
                          Lester McCarthy (Client)
                        </p>
                        <small>CEO of Pixinvent</small>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-info"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-3">
                    <h6 class="mb-0">Create a new project for client</h6>
                    <small class="text-muted">2 Day Ago</small>
                  </div>
                  <p class="mb-2">6 team members in a project</p>
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap border-top-0 p-0"
                    >
                      <div class="d-flex flex-wrap align-items-center">
                        <ul
                          class="list-unstyled users-list d-flex align-items-center avatar-group m-0 me-2"
                        >
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            class="avatar pull-up"
                            aria-label="Vinnie Mostowy"
                            data-bs-original-title="Vinnie Mostowy"
                          >
                            <img
                              class="rounded-circle"
                              src="../../assets/img/avatars/1.png"
                              alt="Avatar"
                            />
                          </li>
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            class="avatar pull-up"
                            aria-label="Allen Rieske"
                            data-bs-original-title="Allen Rieske"
                          >
                            <img
                              class="rounded-circle"
                              src="../../assets/img/avatars/4.png"
                              alt="Avatar"
                            />
                          </li>
                          <li
                            data-bs-toggle="tooltip"
                            data-popup="tooltip-custom"
                            data-bs-placement="top"
                            class="avatar pull-up"
                            aria-label="Julee Rossignol"
                            data-bs-original-title="Julee Rossignol"
                          >
                            <img
                              class="rounded-circle"
                              src="../../assets/img/avatars/2.png"
                              alt="Avatar"
                            />
                          </li>
                          <li class="avatar">
                            <span
                              class="avatar-initial rounded-circle pull-up text-heading"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              data-bs-original-title="3 more"
                              >+3</span
                            >
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!--/ Activity Timeline -->
        <div class="row">
          <!-- Connections -->
          <div class="col-lg-12 col-xl-6">
            <div class="card card-action mb-6">
              <div class="card-header align-items-center">
                <h5 class="card-action-title mb-0">Connections</h5>
                <div class="card-action-element">
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn btn-icon btn-text-secondary rounded-pill dropdown-toggle hide-arrow p-0 text-muted waves-effect waves-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical ti-md text-muted"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Share connections</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Suggest edits</a
                        >
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Report bug</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/avatars/2.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Cecilia Payne</h6>
                          <small>45 Connections</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <button
                          class="btn btn-label-primary btn-icon waves-effect"
                        >
                          <i class="ti ti-user-check ti-md"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/avatars/3.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Curtis Fletcher</h6>
                          <small>1.32k Connections</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <button
                          class="btn btn-primary btn-icon waves-effect waves-light"
                        >
                          <i class="ti ti-user-x ti-md"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/avatars/10.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Alice Stone</h6>
                          <small>125 Connections</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <button
                          class="btn btn-primary btn-icon waves-effect waves-light"
                        >
                          <i class="ti ti-user-x ti-md"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/avatars/7.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Darrell Barnes</h6>
                          <small>456 Connections</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <button
                          class="btn btn-label-primary btn-icon waves-effect"
                        >
                          <i class="ti ti-user-check ti-md"></i>
                        </button>
                      </div>
                    </div>
                  </li>

                  <li class="mb-6">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/avatars/12.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Eugenia Moore</h6>
                          <small>1.2k Connections</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <button
                          class="btn btn-label-primary btn-icon waves-effect"
                        >
                          <i class="ti ti-user-check ti-md"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li class="text-center">
                    <a href="javascript:;">View all connections</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/ Connections -->
          <!-- Teams -->
          <div class="col-lg-12 col-xl-6">
            <div class="card card-action mb-6">
              <div class="card-header align-items-center">
                <h5 class="card-action-title mb-0">Teams</h5>
                <div class="card-action-element">
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn btn-icon btn-text-secondary dropdown-toggle hide-arrow p-0 waves-effect waves-light"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ti ti-dots-vertical text-muted"></i>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Share teams</a
                        >
                      </li>
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Suggest edits</a
                        >
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          class="dropdown-item waves-effect"
                          href="javascript:void(0);"
                          >Report bug</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/icons/brands/react-label.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">React Developers</h6>
                          <small>72 Members</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <a href="javascript:;"
                          ><span class="badge bg-label-danger"
                            >Developer</span
                          ></a
                        >
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/icons/brands/support-label.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Support Team</h6>
                          <small>122 Members</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <a href="javascript:;"
                          ><span class="badge bg-label-primary"
                            >Support</span
                          ></a
                        >
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/icons/brands/figma-label.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">UI Designers</h6>
                          <small>7 Members</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <a href="javascript:;"
                          ><span class="badge bg-label-info">Designer</span></a
                        >
                      </div>
                    </div>
                  </li>
                  <li class="mb-4">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/icons/brands/vue-label.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-2">
                          <h6 class="mb-0">Vue.js Developers</h6>
                          <small>289 Members</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <a href="javascript:;"
                          ><span class="badge bg-label-danger"
                            >Developer</span
                          ></a
                        >
                      </div>
                    </div>
                  </li>
                  <li class="mb-6">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center">
                        <div class="avatar me-2">
                          <img
                            src="../../assets/img/icons/brands/twitter-label.png"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </div>
                        <div class="me-w">
                          <h6 class="mb-0">Digital Marketing</h6>
                          <small>24 Members</small>
                        </div>
                      </div>
                      <div class="ms-auto">
                        <a href="javascript:;"
                          ><span class="badge bg-label-secondary"
                            >Marketing</span
                          ></a
                        >
                      </div>
                    </div>
                  </li>
                  <li class="text-center">
                    <a href="javascript:;">View all teams</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/ Teams -->
        </div>
        <!-- Projects table -->
        <div class="card mb-4">
          <div class="card-datatable table-responsive">
            <div
              id="DataTables_Table_0_wrapper"
              class="dataTables_wrapper dt-bootstrap5 no-footer"
            >
              <div class="card-header pb-0 pt-sm-0">
                <div class="head-label text-center">
                  <h5 class="card-title mb-0">Project List</h5>
                </div>
                <div
                  class="d-flex justify-content-center justify-content-md-end"
                >
                  <div id="DataTables_Table_0_filter" class="dataTables_filter">
                    <label
                      ><input
                        type="search"
                        class="form-control"
                        placeholder="Search Project"
                        aria-controls="DataTables_Table_0"
                    /></label>
                  </div>
                </div>
              </div>
              <table
                class="datatables-projects table border-top dataTable no-footer dtr-column"
                id="DataTables_Table_0"
                aria-describedby="DataTables_Table_0_info"
              >
                <thead>
                  <tr>
                    <th
                      class="control sorting_disabled dtr-hidden"
                      rowspan="1"
                      colspan="1"
                      style="width: 23.3281px; display: none"
                      aria-label=""
                    ></th>
                    <th
                      class="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all"
                      rowspan="1"
                      colspan="1"
                      style="width: 19.4375px"
                      data-col="1"
                      aria-label=""
                    >
                      <input type="checkbox" class="form-check-input" />
                    </th>
                    <th
                      class="sorting sorting_desc"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      style="width: 108.188px"
                      aria-sort="descending"
                      aria-label="Project: activate to sort column ascending"
                    >
                      Project
                    </th>
                    <th
                      class="sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      style="width: 99.9688px"
                      aria-label="Leader: activate to sort column ascending"
                    >
                      Leader
                    </th>
                    <th
                      class="sorting_disabled"
                      rowspan="1"
                      colspan="1"
                      style="width: 75.2812px"
                      aria-label="Team"
                    >
                      Team
                    </th>
                    <th
                      class="w-px-200 sorting"
                      tabindex="0"
                      aria-controls="DataTables_Table_0"
                      rowspan="1"
                      colspan="1"
                      style="width: 200px"
                      aria-label="Progress: activate to sort column ascending"
                    >
                      Progress
                    </th>
                    <th
                      class="sorting_disabled"
                      rowspan="1"
                      colspan="1"
                      style="width: 91.7969px"
                      aria-label="Action"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="odd">
                    <td valign="top" colspan="6" class="dataTables_empty">
                      Loading...
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="row mx-2">
                <div class="col-sm-12 col-md-6">
                  <div
                    class="dataTables_info"
                    id="DataTables_Table_0_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing 0 to 0 of 0 entries
                  </div>
                </div>
                <div class="col-sm-12 col-md-6">
                  <div
                    class="dataTables_paginate paging_simple_numbers"
                    id="DataTables_Table_0_paginate"
                  >
                    <ul class="pagination">
                      <li
                        class="paginate_button page-item previous disabled"
                        id="DataTables_Table_0_previous"
                      >
                        <a
                          aria-controls="DataTables_Table_0"
                          aria-disabled="true"
                          role="link"
                          data-dt-idx="previous"
                          tabindex="-1"
                          class="page-link"
                          ><i class="ti ti-chevron-left ti-sm"></i
                        ></a>
                      </li>
                      <li
                        class="paginate_button page-item next disabled"
                        id="DataTables_Table_0_next"
                      >
                        <a
                          aria-controls="DataTables_Table_0"
                          aria-disabled="true"
                          role="link"
                          data-dt-idx="next"
                          tabindex="-1"
                          class="page-link"
                          ><i class="ti ti-chevron-right ti-sm"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--/ Projects table -->
      </div>
    </div>
    <!--/ User Profile Content -->
  </div>
</template>

<style scoped lang="scss">
.user-profile-header-banner img {
  width: 100%;
  object-fit: cover;
  height: 250px;
}

.user-profile-header {
  margin-top: -2rem;
}
.user-profile-header .user-profile-img {
  border: 5px solid;
  width: 120px;
}

.light-style .user-profile-header .user-profile-img {
  border-color: #fff;
}

.dark-style .user-profile-header .user-profile-img {
  border-color: #2f3349;
}

.dataTables_wrapper .card-header .dataTables_filter label {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

@media (max-width: 767.98px) {
  .user-profile-header-banner img {
    height: 150px;
  }
  .user-profile-header .user-profile-img {
    width: 100px;
  }
}
li {
  margin-top: 0;
  margin-bottom: 0;
}
.card {
  .card-header {
    background: none;
    border: none;
  }
}

.card {
  --bs-card-spacer-y: 1.5rem;
  --bs-card-spacer-x: 1.5rem;
  --bs-card-title-spacer-y: 0.5rem;
  --bs-card-title-color: #444050;
  --bs-card-subtitle-color: #8d8a94;
  --bs-card-border-width: 0;
  --bs-card-border-color: #e6e6e8;
  --bs-card-border-radius: 0.375rem;
  --bs-card-box-shadow: 0 0.1875rem 0.75rem 0 rgba(47, 43, 61, 0.14);
  --bs-card-inner-border-radius: 0.375rem;
  --bs-card-cap-padding-y: 1.5rem;
  --bs-card-cap-padding-x: 1.5rem;
  --bs-card-cap-bg: transparent;
  --bs-card-cap-color: #444050;
  --bs-card-height: ;
  --bs-card-color: #6d6b77;
  --bs-card-bg: #fff;
  --bs-card-img-overlay-padding: 1.5rem;
  --bs-card-group-margin: 1.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: var(--bs-card-height);
  color: var(--bs-body-color);
  word-wrap: break-word;
  background-color: var(--bs-card-bg);
  background-clip: border-box;
  border: var(--bs-card-border-width) solid var(--bs-card-border-color);
  border-radius: var(--bs-card-border-radius);
}
.card > hr {
  margin-right: 0;
  margin-left: 0;
}
.card > .list-group {
  border-top: inherit;
  border-bottom: inherit;
}
.card > .list-group:first-child {
  border-top-width: 0;
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius);
}
.card > .list-group:last-child {
  border-bottom-width: 0;
  border-bottom-right-radius: var(--bs-card-inner-border-radius);
  border-bottom-left-radius: var(--bs-card-inner-border-radius);
}
.card > .card-header + .list-group,
.card > .list-group + .card-footer {
  border-top: 0;
}

.card-body {
  flex: 1 1 auto;
  padding: var(--bs-card-spacer-y) var(--bs-card-spacer-x);
  // color: var(--bs-card-color);
}

.card-title {
  margin-bottom: var(--bs-card-title-spacer-y);
  color: var(--bs-card-title-color);
}

.card-subtitle {
  margin-top: calc(-0.5 * var(--bs-card-title-spacer-y));
  margin-bottom: 0;
  color: var(--bs-card-subtitle-color);
}

.card-text:last-child {
  margin-bottom: 0;
}

.card-link + .card-link {
  margin-left: var(--bs-card-spacer-x);
}

.card-header {
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
  margin-bottom: 0;
  color: var(--bs-card-cap-color);
  background-color: var(--bs-card-cap-bg);
  border-bottom: var(--bs-card-border-width) solid var(--bs-card-border-color);
}
.card-header:first-child {
  border-radius: var(--bs-card-inner-border-radius)
    var(--bs-card-inner-border-radius) 0 0;
}

.card-footer {
  padding: var(--bs-card-cap-padding-y) var(--bs-card-cap-padding-x);
  color: var(--bs-card-cap-color);
  background-color: var(--bs-card-cap-bg);
  border-top: var(--bs-card-border-width) solid var(--bs-card-border-color);
}
.card-footer:last-child {
  border-radius: 0 0 var(--bs-card-inner-border-radius)
    var(--bs-card-inner-border-radius);
}

.card-header-tabs {
  margin-right: calc(-0.5 * var(--bs-card-cap-padding-x));
  margin-bottom: calc(-1 * var(--bs-card-cap-padding-y));
  margin-left: calc(-0.5 * var(--bs-card-cap-padding-x));
  border-bottom: 0;
}
.card-header-tabs .nav-link.active {
  background-color: var(--bs-card-bg);
  border-bottom-color: var(--bs-card-bg);
}

.card-header-pills {
  margin-right: calc(-0.5 * var(--bs-card-cap-padding-x));
  margin-left: calc(-0.5 * var(--bs-card-cap-padding-x));
}

.card-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: var(--bs-card-img-overlay-padding);
  border-radius: var(--bs-card-inner-border-radius);
}

.card-img,
.card-img-top,
.card-img-bottom {
  width: 100%;
}

.card-img,
.card-img-top {
  border-top-left-radius: var(--bs-card-inner-border-radius);
  border-top-right-radius: var(--bs-card-inner-border-radius);
}

.card-img,
.card-img-bottom {
  border-bottom-right-radius: var(--bs-card-inner-border-radius);
  border-bottom-left-radius: var(--bs-card-inner-border-radius);
}

.card-group > .card {
  margin-bottom: var(--bs-card-group-margin);
}
@media (min-width: 576px) {
  .card-group {
    display: flex;
    flex-flow: row wrap;
  }
  .card-group > .card {
    flex: 1 0 0%;
    margin-bottom: 0;
  }
  .card-group > .card + .card {
    margin-left: 0;
    border-left: 0;
  }
  .card-group > .card:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-top,
  .card-group > .card:not(:last-child) .card-header {
    border-top-right-radius: 0;
  }
  .card-group > .card:not(:last-child) .card-img-bottom,
  .card-group > .card:not(:last-child) .card-footer {
    border-bottom-right-radius: 0;
  }
  .card-group > .card:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-top,
  .card-group > .card:not(:first-child) .card-header {
    border-top-left-radius: 0;
  }
  .card-group > .card:not(:first-child) .card-img-bottom,
  .card-group > .card:not(:first-child) .card-footer {
    border-bottom-left-radius: 0;
  }
}
</style>
