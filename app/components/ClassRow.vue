<script setup>
const props = defineProps({
  lesson: Object,
  index: Number,
});

const { lesson, index } = props;
const emit = defineEmits(['calcTotals']);

const numberOfPeople = ref();
const numberOfClassCards = ref();

const totalPrice = computed(
  () => Number(props.lesson.price) * Number(numberOfPeople.value)
);

const totalCards = computed(
  () => Number(props.lesson.price) * Number(numberOfClassCards.value)
);

function watchTotals(e, totalCards, index) {
  emit('calcTotals', e.value, totalCards.value, props.lesson.classCard, index);
}

watch(
  [totalPrice, totalCards],
  () => {
    watchTotals(totalPrice, totalCards, index);
  },
  { immediate: true }
);
</script>

<template>
  <li
    class="flex flex-col md:flex-row md:items-center md:justify-between [&:not(:last-child)]:border-b py-4"
  >
    <div class="w-[60%] flex justify-between items-center">
      <div class="flex items-center">
        <div
          class="text-surface-900 dark:text-surface-0 font-medium mr-2 md:mb-0"
        >
          {{ lesson.level }}
        </div>
        <div class="mt-1 text-muted-color flex items-center">
          <!-- {{ lesson.level }} -->
          <Tag
            severity="concession"
            value="Concession"
            v-if="lesson.concession"
            class="ml-2"
          ></Tag>
          <Tag
            severity="warn"
            value="Class Card"
            v-if="lesson.classCard"
            class="ml-2"
          ></Tag>
        </div>
      </div>
      <div class="max-w-12 text-center">
        <span
          class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0"
        >
          <InputNumber
            v-if="lesson.classCard"
            v-model="numberOfClassCards"
            inputId="integeronly"
            fluid
            placeholder="0" />
          <InputNumber
            v-else
            v-model="numberOfPeople"
            inputId="integeronly"
            fluid
            placeholder="0"
        /></span>
      </div>
    </div>
    <div class="mt-2 md:mt-0 flex items-center max-w-10">
      <span class="ml-4 font-medium">{{ lesson.price }}</span>
    </div>
    <div class="mt-2 md:mt-0 flex items-center max-w-10">
      <span v-if="totalCards" class="text-orange-500 ml-4 font-medium">{{
        totalCards || 0
      }}</span>
      <span v-else class="ml-4 font-medium">{{ totalPrice || 0 }}</span>
    </div>
  </li>
</template>
