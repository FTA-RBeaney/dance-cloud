<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';

const lessons = reactive([
  {
    level: 'Level 1',
    description: 'Beginner',
    concession: false,
    price: 10,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 1',
    description: 'Beginner',
    concession: true,
    price: 6,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 1',
    description: 'Beginner',
    classCard: true,
    price: 1,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 2',
    description: 'Intermediate',
    concession: false,
    price: 10,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 2',
    description: 'Intermediate',
    concession: true,
    price: 6,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 2',
    description: 'Intermediate',
    classCard: true,
    price: 1,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 1+2',
    description: 'Intermediate',
    concession: false,
    price: 15,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 1 + 2',
    description: 'Intermediate',
    concession: true,
    price: 10,
    total: 0,
    totalClassCards: 0,
  },
  {
    level: 'Level 1 + 2',
    description: 'Intermediate',
    classCard: true,
    price: 1.5,
    total: 0,
    totalClassCards: 0,
  },
]);

const levelOneValues = (e, totalCards, isClassCard, i) => {
  if (isClassCard) {
    lessons[i].totalClassCards = totalCards || 0;
  } else {
    lessons[i].total = e || 0;
  }
};

const sum = computed(() => lessons.reduce((acc, item) => acc + item.total, 0));
const cardSum = computed(() =>
  lessons.reduce((acc, item) => acc + item.totalClassCards, 0)
);

// const subtotal =()=> {
//   return this.items
//     .map(({bfloorArea}) => bfloorArea)
//     .reduce((a, b) => a + b, 0)
// }
</script>

<template>
  <div>
    <Card class="mt-8">
      <template #title>Enter lesson info</template>
      <template #content>
        <div class="flex justify-between items-center my-2">
          <div class="font-semibold text-xl">Class 1 only</div>
        </div>
        <ul class="list-none p-0 m-0">
          <ClassRow
            v-for="(lesson, i) in lessons"
            :key="`lesson${i}`"
            :lesson="lesson"
            :index="i"
            @calc-totals="levelOneValues"
          >
          </ClassRow>
        </ul>
        <div class="text-right mt-5 font-bold">Total cash: {{ sum }}</div>
        <div class="text-right mt-5 font-bold">
          Total class cards: {{ cardSum }}
        </div>
      </template>
    </Card>
  </div>
</template>
