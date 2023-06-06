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

function leaveLobby() {
  gameServer.socket.emit("lobby:leave");
}

onMounted(() => {
  gameServer.socket.emit("lobby:getCurrent");
  refresh();
});
</script>

<template>
  <div class="container">
    <div class="current-lobby" v-if="gameServer.state.lobby !== null">
      Lobby id: {{ gameServer.state.lobby.id }}
      <div class="current-lobby__members">
        <div
          class="current-lobby__members__member"
          v-for="member in gameServer.state.lobby.members"
        >
          <p>
            {{ member.name }}
          </p>
          <div class="member-data">
            <p class="member-data__level">Level {{ member.level }}</p>
            <p class="member-data__class">{{ member.class }}</p>
          </div>
        </div>
      </div>
      <button @click="leaveLobby">Leave</button>
    </div>
    <div class="lobbies" v-else>
      Lobbies
      <div class="lobby" v-for="lobby in gameServer.state.lobbies">
        <div class="">
          {{ lobby.name }}
          {{ lobby.size }} / 4
        </div>
        <button
          @click="joinLobby(lobby.id)"
          :disabled="gameServer.state.lobby !== null"
        >
          Join
        </button>
      </div>
      <div class="create-lobby">
        <input type="text" v-model="lobbyName" />
        <button @click="createLobby">Create Lobby</button>
      </div>
      <button @click="refresh">Refresh</button>
    </div>
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

.create-lobby {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.current-lobby {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.current-lobby__members {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.current-lobby__members__member {
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 10px;
}

.current-lobby__members * p {
  margin: 0;
}

.member-data {
  display: flex;
}
.member-data__class::first-letter {
  text-transform: uppercase;
}
</style>
