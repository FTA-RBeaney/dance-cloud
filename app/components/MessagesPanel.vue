<script setup lang="ts">
import { Send } from "lucide-vue-next";
const { data: messages, refresh } = await useFetch("/api/messages");
const newMessage = ref("");

async function sendMessage() {
  if (!newMessage.value.trim()) return;
  await $fetch("/api/messages", {
    method: "POST",
    body: {
      text: newMessage.value,
    },
  });
  newMessage.value = "";
  await refresh();
}
</script>

<template>
  <div>
    <div class="card mb-4 max-w-md">
      <!-- component -->
      <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[725px]">
        <div
          class="flex sm:items-center justify-between pb-4 border-b border-dashed border-gray-200 dark:border-slate-700"
        >
          <div class="relative flex items-center space-x-4">
            <div class="relative">
              <span class="absolute text-green-500 right-0 bottom-0">
                <svg width="14" height="14">
                  <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                </svg>
              </span>
              <img
                src="https://avatar.iran.liara.run/public/58"
                alt=""
                class="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div class="flex flex-col leading-tight">
              <div class="text-xl mt-1 flex items-center font-medium">
                <span class="text-gray-700 mr-3 dark:text-slate-200"
                  >Anderson Vanhron</span
                >
              </div>
              <span class="text-sm text-gray-500">online</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button
              type="button"
              class="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-search"></i>
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-phone"></i>
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-video"></i>
            </button>
            <button
              type="button"
              class="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <i class="fas fa-ellipsis-vertical dark:text-slate-400"></i>
            </button>
          </div>
        </div>
        <div
          id="messages"
          class="flex flex-col space-y-4 p-3 overflow-y-auto"
          data-simplebar="init"
        >
          <div class="simplebar-wrapper" style="margin: -12px">
            <div class="simplebar-height-auto-observer-wrapper">
              <div class="simplebar-height-auto-observer"></div>
            </div>
            <div class="simplebar-mask">
              <div class="simplebar-offset" style="right: 0px; bottom: 0px">
                <div
                  class="simplebar-content-wrapper"
                  tabindex="0"
                  role="region"
                  aria-label="scrollable content"
                  style="height: 100%; overflow: hidden scroll"
                >
                  <div class="simplebar-content" style="padding: 12px">
                    <!-- <div class="chat-message">
                      <div class="flex items-end">
                        <div
                          class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start font-medium"
                        >
                          <div>
                            <span
                              class="px-4 py-2 rounded-lg inline-block rounded-bl-none border border-gray-100 bg-gray-50 text-gray-600 dark:border-slate-800 dark:bg-slate-700 dark:text-slate-400"
                              >Can be verified on any platform using
                              docker</span
                            >
                          </div>
                        </div>
                        <img
                          src=""
                          alt="My profile"
                          class="w-8 h-8 rounded-full order-1"
                        />
                      </div>
                    </div> -->
                    <div
                      class="chat-message mb-4"
                      v-for="message of messages"
                      :key="message.id"
                    >
                      <div class="flex items-end justify-end">
                        <div
                          class="flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end font-medium"
                        >
                          <div>
                            <span
                              class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-500 text-white"
                              >{{ message.text }}
                            </span>
                          </div>
                        </div>
                        <img
                          src="https://avatar.iran.liara.run/public/43"
                          alt="My profile"
                          class="w-8 h-8 rounded-full order-2"
                        />
                      </div>
                      <div class="flex text-sm text-gray-300 justify-end">
                        {{
                          new Date(message.created_at).toLocaleString("fr-FR")
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="simplebar-placeholder"
              style="width: auto; height: 966px"
            ></div>
          </div>
          <div
            class="simplebar-track simplebar-horizontal"
            style="visibility: hidden"
          >
            <div
              class="simplebar-scrollbar"
              style="width: 0px; display: none"
            ></div>
          </div>
          <div
            class="simplebar-track simplebar-vertical"
            style="visibility: visible"
          >
            <div
              class="simplebar-scrollbar"
              style="
                height: 280px;
                transform: translate3d(0px, 0px, 0px);
                display: block;
              "
            ></div>
          </div>
        </div>
        <div
          class="border-t border-dashed border-gray-200 pt-4 mb-2 sm:mb-0 dark:border-slate-700"
        >
          <div class="relative flex">
            <form @submit.prevent="sendMessage" class="w-full">
              <span class="absolute inset-y-0 flex items-center"> </span>
              <Input
                type="text"
                v-model="newMessage"
                placeholder="Write your message!"
                class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-50 dark:bg-slate-700 rounded-md py-2 border border-gray-200 dark:border-slate-800"
              />
              <div
                class="absolute right-0 items-center inset-y-0 hidden sm:flex"
              >
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i class="fas fa-paperclip"></i>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i class="fas fa-camera"></i>
                </button>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i class="fas fa-face-smile"></i>
                </button>
                <button
                  type="submit"
                  class="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                >
                  <Send class="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!messages?.length">No messages yet</p>
  </div>
</template>
