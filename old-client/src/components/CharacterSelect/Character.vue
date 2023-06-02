<script setup>
import { ref } from "vue";
import ClassIcon from "../ClassIcon.vue";

const props = defineProps(["id", "name", "class", "level"]);

const deleteCharacter = async (characterId) => {
  const url = `http://localhost:3000/api/v1/characters/${characterId}`;
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  fetch(url, options).then(async (response) => {
    if (response.status !== 200) {
      console.log("failed to delete character", response);
      return;
    }
    const data = await response.json();
    console.log(data.message);
    isDeleted.value = true;
  });
};

const isDeleted = ref(false);
</script>

<template>
  <div v-if="!isDeleted" class="character border--light">
    
    <!-- not dry but this is the easiest way to do this -->
    <ClassIcon :playerClass="props.class" />

    <div class="character__wrapper">
      <p class="character__name">{{ props.name }}</p>
      <p class="character__class">{{ props.class }}</p>
      <p class="character__level">Level {{ props.level }}</p>
    </div>

    <button class="button-close" @click="deleteCharacter(props.id)"></button>
  </div>
</template>

<style scoped>
.character {
  box-sizing: border-box;
  min-height: 100px;
  min-width: fit-content;
  display: flex;
  gap: 10px;
  user-select: none;
}

.button-close {
  margin-left: auto;
}

.character__wrapper {
  align-items: center;
}

.character:not(:last-child) {
  margin-bottom: 3px;
}

.character:hover {
  border: 1px solid rgb(179, 179, 179);
  background-color: #242424;
}

.character__class::first-letter {
  text-transform: capitalize;
}

/* this should be inside the modal component */
.modal--delete-character {
  --width: 400px;
  --height: 250px;
  padding: 10px;
  position: fixed;
  left: calc(50% - calc(var(--width) / 2));
  top: calc(40% - calc(var(--height) / 2));
  background-color: rgb(43, 43, 43);
  width: var(--width);
  height: var(--height);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 15px;
}

.wrapper {
  margin: auto;
}
</style>
