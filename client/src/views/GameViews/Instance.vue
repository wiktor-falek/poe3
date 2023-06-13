<script lang="ts" setup>
import * as gameServer from "../../../src/socket/gameServer";
import { watch } from "vue";
import router from "../../router";
import { onBeforeMount } from "vue";
import useCharacterStore from "../../stores/characterStore";
const characterStore = useCharacterStore();

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
</script>

<template>
  <div class="instance" v-if="gameServer.state.instance">
    <h1>Instance</h1>

    <div class="board">
      <div class="party party--enemy">
        <div class="party__member" v-for="enemy in gameServer.state.instance.enemies">
          <p>
            <span class="party__member__name">{{ enemy.name }}</span
            >&nbsp;
            <span class="party__member__level">Lvl {{ enemy.level }}</span>
          </p>
          <p>{{ enemy.hp }} / {{ enemy.maxHp }} HP</p>
        </div>
      </div>
      <div class="party party--ally">
        <div class="party__member" v-for="character in gameServer.state.instance.characters">
          <p>
            <span
              class="party__member__name"
              :class="{
                'party__member--current-character':
                  characterStore.staticCharacter?.name === character.name,
              }"
              >{{ character.name }}</span
            >&nbsp;
            <span class="party__member__level"> Lv {{ character.level.value }}</span>
          </p>
          <p>{{ character.resources.hp }} / {{ character.resources.maxHp }} HP</p>
          <p>{{ character.resources.mp }} / {{ character.resources.maxMp }} MP</p>
        </div>
      </div>
    </div>

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
</style>
