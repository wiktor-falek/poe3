<script lang="ts" setup>
import { ref } from "vue";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import { CharacterClass } from "@poe3/types";

const router = useRouter();

const charactersOverview: Ref<
  Array<{
    name: string;
    level: number;
    class: CharacterClass;
  }>
> = ref([]);
const selectedCharacterName: Ref<string | null> = ref(null);

function playHandler() {
  if (!selectedCharacterName.value) {
    return;
  }

  localStorage.setItem("characterName", selectedCharacterName.value);

  router.push("/game");
}

onBeforeMount(async () => {
  const response = await fetch("http://localhost:3000/api/characters", {
    method: "GET",
    credentials: "include",
  });

  const result = await response.json();

  charactersOverview.value = result;
});
</script>

<template>
  <main>
    <h2>Characters</h2>
    <div class="characters">
      <RouterLink to="/creation" class="button">Create Character</RouterLink>
      <p v-if="charactersOverview.length === 0">No characters</p>
      <div
        class="character"
        v-for="character in charactersOverview"
        tabindex="0"
        @click="selectedCharacterName = character.name"
        @keyup.enter="selectedCharacterName = character.name"
        @keyup.space="selectedCharacterName = character.name"
        :class="{ selected: selectedCharacterName === character.name }"
      >
        <p class="character__name">{{ character.name }}</p>
        <p class="character__data">
          Level {{ character.level }}
          <span class="character__data__class">{{ character.class }}</span>
        </p>
      </div>
    </div>

    <button
      class="button"
      id="play"
      :disabled="selectedCharacterName === null"
      @click="playHandler"
    >
      Play
    </button>
  </main>
</template>

<style scoped>
#play {
  max-width: 250px;
  width: 100%;
}

.selected {
  border-color: orange !important;
}

.characters {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  border: 2px solid gray;
  border-radius: 5px;
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

.character__data__class {
  text-transform: capitalize;
}
</style>
