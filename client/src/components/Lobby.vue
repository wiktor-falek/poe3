<script lang="ts" setup>
import { onMounted } from "vue";
import * as gameServer from "../../src/socket/gameServer";
import { ref } from "vue";

const lobbyName = ref("");

function refresh() {
  gameServer.socket.emit("lobby:getAll");
}

function createLobby() {
  if (!lobbyName.value) {
    return;
  }
  gameServer.socket.emit("lobby:create", lobbyName.value);
  lobbyName.value = "";
}

function joinLobby(lobbyId: string) {
  gameServer.socket.emit("lobby:join", lobbyId);
}

onMounted(() => {
  refresh();
});
</script>

<template>
  <div class="container">
    <div class="lobbies">
      Lobbies
      <div class="lobby" v-for="lobby in gameServer.state.lobbies">
        <div class="">
          {{ lobby.name }}
          {{ lobby.size }} / 4
        </div>
        <button @click="joinLobby(lobby.id)">Join</button>
      </div>
    </div>
    <div>
      <input type="text" v-model="lobbyName" />
      <button @click="createLobby">Create Lobby</button>
    </div>
    <button @click="refresh">Refresh</button>
  </div>

  <div v-if="gameServer.state.lobby">
    Current lobby: {{ gameServer.state.lobby.id }}
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  max-width: 1000px;
  justify-content: center;
  margin: auto;
  padding: 20px;
  border: 2px solid gray;
  flex-direction: column;
  gap: 30px;
  font-size: 1.2rem;
}

.lobbies {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}
.lobby {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 10px;
}
</style>
