<script setup>
import { ref } from "vue";
import Character from "./Character.vue";
import CharacterCreation from "./CharacterCreation.vue";

const fetchCharacters = async () => {
  const url = "http://localhost:3000/api/v1/characters";
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await fetch(url, options);
  if (response.status === 200 || response.status === 304) {
    const data = await response.json();
    localStorage.setItem("isAuthenticated", "true");
    return data;
  }
};

const characters = ref([]);
fetchCharacters().then((charactersData) => {
  characters.value = charactersData;
});

const selectedCharacter = ref();

const characterSelect = (e, id) => {
  selectedCharacter.value = id;

  const allCharacters = document.querySelector(".characters-list");
  [...allCharacters.children].forEach((child) => {
    child.classList.remove("focus");
  });
  e.currentTarget.classList.toggle("focus");
};

const showCharacterCreation = ref(false);

const redirectToGame = () => {
  const url = `/game/${selectedCharacter.value}`;
  window.location.href = url;
};
</script>

<template>
  <div class="content" v-show="!showCharacterCreation">
    <button
      class="character-select margin-vertical"
      @click="showCharacterCreation = !showCharacterCreation"
    >
      Create New
    </button>
    <div class="characters-list border--dark">
      <Character
        v-for="character in characters"
        :ref="character.id"
        :id="character.id"
        :key="character.id"
        :name="character.name"
        :class="character.class"
        :level="character.level"
        @click="characterSelect($event, character.id)"
      />
      <div v-if="!characters" style="text-align: center; padding-top: 10px">
        No characters
      </div>
    </div>
    <button
      class="character-select margin-vertical"
      @click="redirectToGame"
      :disabled="!selectedCharacter"
    >
      LOGIN DUDE
    </button>
  </div>
  <div class="content" v-show="showCharacterCreation">
    <button
      class="margin-vertical"
      @click="showCharacterCreation = !showCharacterCreation"
    >
      Go back
    </button>
    <CharacterCreation />
  </div>
</template>

<style>
.characters-list {
  display: flex;
  flex-direction: column;
  height: 600px;
  overflow: scroll;
  width: 300px;
  padding: 10px;
  box-sizing: content-box;
}
</style>
