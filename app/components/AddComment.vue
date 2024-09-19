<script setup lang="ts">
import { Send } from 'lucide-vue-next';

const { data } = useAuth();

const newMessage = ref('');

const props = defineProps({
  postId: String,
});

const { data: messages, refresh } = await useFetch('/api/messages');

const comments = computed(() => {
  return messages.value.filter((s) => s.post_id === props.postId);
});

async function sendMessage() {
  if (!newMessage.value.trim()) return;
  await $fetch('/api/messages', {
    method: 'POST',
    body: {
      text: newMessage.value,
      post_id: props.postId,
      user_id: data.value.user.userId,
    },
  });
  newMessage.value = '';
  await refresh();
}
</script>

<template>
  <div
    class="border-t border-dashed border-gray-200 pt-4 mb-2 sm:mb-0 dark:border-slate-700 max-w-lg mx-auto"
  >
    <div class="relative">
      <form @submit.prevent="sendMessage" class="w-full flex relative">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Write your message!"
          class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-50 dark:bg-slate-700 rounded-md py-2 border border-gray-200 dark:border-slate-800"
        />
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-md px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <Send class="w-4 h-4" />
          </button>
        </div>
      </form>
      <div class="overflow-auto">
        <CourseComment
          v-for="(message, i) in comments"
          :key="`comment${i}`"
          v-bind="message"
          :userId="message.user_id"
          :text="message.text"
          :date="message.created_at"
        />
      </div>
    </div>
  </div>
</template>
