<script setup lang="ts">
const { data: redirects, refresh } = await useFetch("/api/redirects", {
  transform: (data: { [key: string]: string }) => {
    // Transform to text for the textarea
    return {
      text: Object.entries(data)
        .map(([from, to]) => `${from} ${to}`)
        .join("\n"),
    };
  },
});

async function updateRedirects() {
  const body = Object.fromEntries(
    redirects.value!.text.split("\n").map((line) => line.split(" "))
  );
  await $fetch("/api/redirects", {
    method: "PUT",
    body,
  });
  await refresh();
}
</script>

<template>
  <div>
    <Card>
      <template #title>Simple Card</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
          sed consequuntur error repudiandae numquam deserunt quisquam repellat
          libero asperiores earum nam nobis, culpa ratione quam perferendis
          esse, cupiditate neque quas!
        </p>
        <Button label="Check" icon="pi pi-check" />
      </template>
    </Card>
    <h3>Server redirects</h3>
    <form @submit.prevent="updateRedirects">
      <p>
        <textarea
          v-model="redirects.text"
          rows="6"
          placeholder="/from /to (one redirect per line)"
          style="width: 300px"
        />
      </p>
      <button type="submit">Save redirects</button>
    </form>
  </div>
</template>
