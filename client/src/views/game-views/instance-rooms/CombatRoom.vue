<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../../../../src/socket/gameServer";
import useCharacterStore from "../../../stores/characterStore";
import { onUnmounted } from "vue";

gameServer.socket.on("instance:state-update", async (state) => {
  const room = gameServer.state.instance!.room!;

  // take all updates from the state.actions and update state incrementally with a delay
  for (const action of state.actions) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const target = room.players.find((player) => player.id === action.targetId);
    if (target) {
      console.log({ damage: action.damage });
      target.resources.hp = Math.max(target.resources.hp - action.damage, 0);
      // TODO: display damage number animation and flash target player
    }
  }

  if (state.restoredResources) {
    // player turn start
    room.currentTurnPlayerName = state.restoredResources.entityId;
    const player = room.players.find((player) => player.id === state.restoredResources?.entityId)!;
    const resources = state.restoredResources.resources;
    if (resources) {
      if (resources.ap) {
        player.resources.ap = resources.ap;
      }
      if (resources.hp) {
        player.resources.hp = resources.hp;
      }
      if (resources.mp) {
        player.resources.mp = resources.mp;
      }

      // update instance.room.currentTurnPlayerId from state
      room.currentTurnPlayerName = player.name;
    }
  }
});

gameServer.socket.on("instance:player-action", (action) => {
  const enemies = gameServer.state.instance?.room?.enemies;
  const players = gameServer.state.instance?.room?.players;

  const attacker = players?.find((player) => player.id === action.attackerId);
  const target = enemies?.find((enemy) => enemy.id === action.targetId);

  if (attacker) {
    if (action.cost?.ap) {
      attacker.resources.ap -= action.cost.ap;
    }
    if (action.cost?.mp) {
      attacker.resources.mp -= action.cost.mp;
    }
    if (action.cost?.hp) {
      attacker.resources.hp -= action.cost.hp;
    }
  }

  if (target) {
    // animation
    // alternate animation if action.critical
    target.hp = Math.max(target.hp - action.damage, 0);
  }
});

onUnmounted(() => {
  gameServer.socket.off("instance:state-update");
  gameServer.socket.off("instance:player-action");
});

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

const player = ref(
  gameServer.state.instance?.room?.players.find(
    (player) => player.name === characterStore.staticCharacter?.name
  )
);
</script>

<template>
  <div class="instance" v-if="gameServer.state.instance?.room">
    <p v-if="gameServer.state.instance.room.enemiesWon">Enemy Party Won</p>
    <p v-if="gameServer.state.instance.room.playersWon">Your Party Won</p>

    <p
      v-if="
        gameServer.state.instance.room.currentTurnPlayerName ===
        characterStore.staticCharacter?.name
      "
    >
      Your Turn
    </p>
    <p v-if="gameServer.state.instance.room.currentTurnPlayerName">
      Current turn: {{ gameServer.state.instance.room.currentTurnPlayerName }}
    </p>

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
    <h3 class="red" v-if="player && player.resources.hp <= 0">You Are Dead</h3>
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
