<script lang="ts" setup>
import { ref } from "vue";
import { usePlayerStore } from "../stores/playerStore";
import useSocketStore from "../stores/socketStore";
import ClassIcon from "./ClassIcon.vue";

const characterName = usePlayerStore().character.name;
console.log("here", characterName);
const socket = useSocketStore().socket;

const partyData = ref();

socket.emit("party:get-data");

socket.on("party:data", (data) => {
  partyData.value = data;
  console.log("here", data);
});
</script>

<template>
  <div class="party">
    <div
      class="party__member"
      :class="{ faded: !client.isConnected }"
      v-if="partyData"
      v-for="client in partyData.clients"
    >
      <ClassIcon :playerClass="client.character.class" />
      <div class="">
        <p
          :class="{
            'color--this-player': client.character.name === characterName,
          }"
        >
          {{ client.character.name }}
        </p>
        <p>
          Lv {{ client.character.level }}
          <span class="capitalize"> {{ client.character.class }}</span>
        </p>
      </div>
      <button v-if="client.character.name === characterName && partyData.clients.length !== 1">Leave</button>
    </div>
  </div>
</template>

<style scoped>
.party {
}

.faded {
  opacity: 0.2;
}

.party__member {
  display: flex;
  width: 100%;
  background-color: rgb(40, 40, 40);
  border: 1px solid white;
  gap: 10px;
}
</style>
