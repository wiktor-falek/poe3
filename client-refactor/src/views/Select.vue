<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { onBeforeMount } from "vue";
import type { ResponseGetAllCharactersOverview } from "../../../common/api-types/index";
import Logout from "../components/global/Logout.vue";

const allCharacters: Ref<ResponseGetAllCharactersOverview> = ref([]);

onBeforeMount(async () => {
  const response = await fetch("http://localhost:3000/api/characters", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  allCharacters.value = result;
});
</script>

<template>
  <h1>Play</h1>

  <Logout />

  <h2>Characters</h2>
  <div class="characters">
    <p v-if="allCharacters.length === 0">No characters</p>
    <div class="character" v-for="character in allCharacters">
      <p>
        {{ character.name }} Lvl {{ character.level }} {{ character.class }}
      </p>
    </div>
  </div>
  <RouterLink to="/creation" class="button">Create Character</RouterLink>
</template>
