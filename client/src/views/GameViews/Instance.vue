<script lang="ts" setup>
import * as gameServer from "../../../src/socket/gameServer";
import { watch } from "vue";
import router from "../../router";
import { onBeforeMount } from "vue";
import useCharacterStore from "../../stores/characterStore";
import { ref, Ref } from "vue";
const characterStore = useCharacterStore();

function playerAction() {
  if (targetId.value === null) {
    gameServer.state.messages.push({ content: "Invalid target", sender: "SYSTEM", group: "ERROR" });
    return;
  }
  gameServer.socket.emit("instance:action", targetId.value);
}

function leaveInstance() {
  gameServer.socket.emit("instance:leave");
}

onBeforeMount(() => {
  if (gameServer.state.instance === null) {
    router.push("/game/lobby");
  }
  watch(
    () => gameServer.state.instance,
    (newInstance, _) => {
      if (newInstance === null) {
        router.push("/game/lobby");
      }
    }
  );
});

// combat stuff
// TODO: move to a separate component that will be render if instance.room.type === "combat"

const targetId: Ref<string | null> = ref(null);

function selectTarget(id: string) {
  console.log(id);
  targetId.value = id;
}
</script>

<template>
  <div class="instance" v-if="gameServer.state.instance">
    <h1>Instance</h1>
    <p v-if="gameServer.state.yourTurn">Your Turn</p>

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
        </div>
      </div>
    </div>
    <button @click="playerAction">Player Action</button>
    <button @click="leaveInstance">Leave Instance</button>
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
</style>
