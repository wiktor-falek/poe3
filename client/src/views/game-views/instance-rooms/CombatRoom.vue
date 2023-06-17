<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../../../../src/socket/gameServer";
import useCharacterStore from "../../../stores/characterStore";

const characterStore = useCharacterStore();

const targetId: Ref<string | null> = ref(null);

function selectTarget(id: string) {
  targetId.value = id;
}

function playerAction() {
  if (targetId.value === null) {
    gameServer.state.messages.push({ content: "Invalid target", sender: "SYSTEM", group: "ERROR" });
    return;
  }
  const BASIC_ATTACK = "0";
  gameServer.socket.emit("instance:action", targetId.value, BASIC_ATTACK);
}

function endTurn() {
  gameServer.socket.emit("instance:end-turn");
}

function leaveInstance() {
  gameServer.socket.emit("instance:leave");
}
</script>

<template>
  <div class="instance" v-if="gameServer.state.instance?.room">
    <p v-if="gameServer.state.currentTurnPlayer === characterStore.staticCharacter?.name">
      Your Turn
    </p>

    <p v-if="gameServer.state.instance.room.enemiesWon">Enemy Party Won</p>
    <p v-if="gameServer.state.instance.room.playersWon">Your Party Won</p>

    <div class="board" v-if="gameServer.state.instance.room">
      <div class="party party--enemy">
        <div
          class="party__member"
          v-for="enemy in gameServer.state.instance.room.enemies"
          @click="selectTarget(enemy.id)"
          :class="{ selected: enemy.id === targetId }"
        >
          <p>
            <span class="party__member__name">{{ enemy.name }}</span
            >&nbsp;
            <span class="party__member__level">Lvl {{ enemy.level }}</span>
          </p>
          <p>{{ enemy.hp }} / {{ enemy.maxHp }} HP</p>
        </div>
      </div>
      <div class="party party--ally">
        <div class="party__member" v-for="player in gameServer.state.instance.room.players">
          <p>
            <span
              class="party__member__name"
              :class="{
                'party__member--current-character':
                  characterStore.staticCharacter?.name === player.name,
              }"
              >{{ player.name }}</span
            >&nbsp;
            <span class="party__member__level"> Lv {{ player.level }}</span>
          </p>
          <p>{{ player.resources.hp }} / {{ player.resources.maxHp }} HP</p>
          <p>{{ player.resources.mp }} / {{ player.resources.maxMp }} MP</p>
          <p>{{ player.resources.ap }} / {{ player.resources.maxAp }} AP</p>
        </div>
      </div>
    </div>
    <button class="button" @click="playerAction">Player Action</button>
    <button class="button" @click="endTurn">End Turn</button>
    <button class="button" @click="leaveInstance">Leave Instance</button>
    <h3 class="red" v-if="gameServer.state.isDead">You Are Dead</h3>
  </div>
</template>

<style scoped>
.board {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.party {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.party__member {
  border: 1px solid gray;
  width: 120px;
  height: 120px;
}

.party__member > * {
  margin: 0;
  padding: 0;
}

.party__member__name {
}

.party__member--current-character {
  color: var(--current-character);
}

.party__member__level {
}

.selected {
  border-color: orange;
}

.red {
  color: rgb(212, 73, 73);
}
</style>
