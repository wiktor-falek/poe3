<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { onBeforeMount } from "vue";
import type { ResponseGetAllCharactersOverview } from "../../../common/api-types/index";

const allCharacters: Ref<ResponseGetAllCharactersOverview> = ref([]);

onBeforeMount(async () => {
  // TODO: cache and refetch only if just logged in
  const response = await fetch("http://localhost:3000/api/characters", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  allCharacters.value = result;
});
</script>

<template>
  <main>
    <h2>Characters</h2>
    <div class="characters">
      <p v-if="allCharacters.length === 0">No characters</p>
      <div class="character" v-for="character in allCharacters">
        <p>{{ character.name }}</p>
        <p>Level {{ character.level }} {{ character.class }}</p>
      </div>
    </div>
    <RouterLink to="/creation" class="button">Create Character</RouterLink>
  </main>
</template>

<style scoped>
.characters {
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  max-width: 350px;
  box-sizing: border-box;
}

.character {
  border: 2px solid gray;
  border-radius: 3px;
  padding: 10px;
}

.character p {
  margin: 0;
}
</style>
