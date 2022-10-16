<script setup>
import { ref } from "vue";

const props = defineProps(["id", "name", "class", "level"]);

const deleteCharacter = async (characterId) => {
  const url = `http://localhost:3000/api/v1/character/${characterId}`;
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
    <div class="character__wrapper">
      <p class="character__name">{{ props.name }}</p>
      <p class="character__class">{{ props.class }}</p>
      <p class="character__level">lvl {{ props.level }}</p>
    </div>

    <button class="button-close" @click="deleteCharacter(props.id)"></button>
    <!-- <button class="button-close" @click="deleteCharacter(props.id)"></button> -->
  </div>

  <!-- fuck this fucking piece of shit modal -->
  <!-- <div v-if="modalIsOpened" class="modal--delete-character">
    <p>Are you sure you want to delete this character?</p>
    <p>This action is irreversible!</p>
    <div class="wrapper">
      <button class="button--decline" @click="deleteCharacter(props.id); modalIsOpened = false">Yes</button>
      <button class="button--confirm" @click="modalIsOpened = false">No</button>
    </div>
  </div> -->
</template>

<style scoped>
.character {
  box-sizing: border-box;
  min-height: 100px;
  padding-left: 20px;
  min-width: fit-content;
  display: flex;
  justify-content: space-between;
}

.character__wrapper {
  align-items: center;
}

.character:not(:last-child) {
  margin-bottom: 3px;
}

.character:hover {
  border: 2px solid orange;
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
  z-index: 100000;
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
