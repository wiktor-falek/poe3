<script lang="ts" setup>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import type { ResponseGetAllCharactersOverview } from "../../../common/api-types/index";
import { Ref } from "vue";

const allCharacters: Ref<ResponseGetAllCharactersOverview> = ref([]);

onBeforeMount(async () => {
  const response = await fetch("http://localhost:3000/api/characters", {
    method: "GET",
    credentials: "include",
  });

  console.log(response.status);
});
</script>

<template>
  <h1>Play</h1>
</template>
