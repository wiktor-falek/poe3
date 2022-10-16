<script setup>
import { ref } from "vue";
import { io } from "socket.io-client";

const session = {
  sessionId: document.cookie
    .split("; ")
    .find((row) => row.startsWith("sessionId="))
    ?.split("=")[1],
  username: document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1],
};

const availableDungeons = ref([]);
const selectedDungeonId = ref();

const socket = io("http://localhost:4000", {
  auth: session,
});

socket.on("availableDungeons", (data) => {
  availableDungeons.value = data;
  console.log(availableDungeons.value);
});

const joinInstance = (id) => {
  socket.emit("instance:join", id);
};

</script>

<template>
  <main>
    <div class="container" style="text-align: center">
      <h1>socket.io test</h1>
      <div class="dungeons">
        <div
          class="dungeon"
          v-for="dungeon in availableDungeons"
          @click="selectedDungeonId = dungeon.id"
        >
          {{ dungeon.id }} - {{ dungeon.name }}
        </div>
        <button @click="joinInstance(selectedDungeonId)">Select</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dungeons {
  width: 400px;
  height: 800px;
}
.dungeon {
  text-align: left;
  border: 1px solid orange;
}

.dungeon:hover {
  background-color: rgb(44, 44, 44);
}

.dungeon:active {
  background-color: rgb(60, 60, 60);
}
</style>
