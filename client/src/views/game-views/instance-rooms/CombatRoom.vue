<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../../../../src/socket/gameServer";
import useCharacterStore from "../../../stores/characterStore";
import { onUnmounted } from "vue";
import ResourceBars from "../../../components/ResourceBars.vue";

interface DamagePopup {
  attackerId: string;
  targetId: string;
  damage: number;
  critical: boolean;
}

function displayDamagePopup(
  attackerId: string,
  targetId: string,
  damage: number,
  critical: boolean
) {
  damagePopup.value = {
    attackerId,
    targetId,
    damage,
    critical,
  };
  setTimeout(() => {
    damagePopup.value = null;
  }, 900);
}

gameServer.socket.on("instance:state-update", async (state) => {
  const room = gameServer.state.instance!.room!;

  // take all updates from the state.actions and update state incrementally with a delay
  for (const action of state.actions) {
    const target = room.players.find((player) => player.id === action.targetId);
    if (target) {
      displayDamagePopup(action.attackerId, action.targetId, action.damage, action.critical);
      target.resources.hp = Math.max(target.resources.hp - action.damage, 0);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
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

const damagePopup: Ref<DamagePopup | null> = ref(null);

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
  <div class="combat-room" v-if="gameServer.state.instance?.room">
    <div class="board" v-if="gameServer.state.instance.room">
      <div class="party party--enemy">
        <div
          class="entity"
          v-for="enemy in gameServer.state.instance.room.enemies"
          @click="selectTarget(enemy.id)"
        >
          <!-- damage popup space -->
          <div class="entity__sprite">SPRITE</div>

          <hr
            class="entity__select"
            :class="{
              'entity__select--selected': targetId === enemy.id,
              'entity__select--attacking': damagePopup?.attackerId === enemy.id,
            }"
          />

          <div class="entity__resources">
            <ResourceBars :resources="{ hp: enemy.hp, maxHp: enemy.maxHp }"></ResourceBars>
          </div>

          <p class="entity__text">
            <span class="entity__name">{{ enemy.name }}</span
            >&nbsp;
            <span class="entity__level"> Lv {{ enemy.level }}</span>
          </p>
        </div>
      </div>
      <div class="party party--ally">
        <div class="entity" v-for="player in gameServer.state.instance.room.players">
          <div class="entity__damage-popup">
            <p
              v-show="damagePopup?.targetId === player.id"
              class="entity__damage-popup__damage"
              :class="{ 'entity__damage-popup__damage--critical': damagePopup?.critical }"
            >
              {{ damagePopup?.damage }}
            </p>
          </div>
          <div class="entity__sprite">SPRITE</div>

          <hr
            class="entity__select"
            :class="{
              'entity__select--selected': targetId === player.id,
            }"
          />

          <div class="entity__resources">
            <ResourceBars :resources="player.resources"></ResourceBars>
          </div>

          <p class="entity__text">
            <span
              class="entity__name"
              :class="{
                'entity--current-character': characterStore.staticCharacter?.name === player.name,
              }"
              >{{ player.name }}</span
            >&nbsp;
            <span class="entity__level"> Lv {{ player.level }}</span>
          </p>
        </div>
      </div>
    </div>

    <button class="button" @click="playerAction">Player Action</button>
    <button class="button" @click="endTurn">End Turn</button>
    <button class="button" @click="leaveInstance">Leave Instance</button>
    <p>{{ damagePopup }}</p>
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
    <h3 class="red" v-if="player && player.resources.hp <= 0">You Are Dead</h3>
  </div>
</template>

<style scoped>
.combat-room {
  user-select: none;
}
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

.entity {
  position: relative;
}

.entity__damage-popup {
  height: 24px;
}

.entity__damage-popup__damage {
  padding: 0;
  margin: 0;
  font-size: 24px;
  line-height: 1em;
  font-weight: bold;
  text-align: center;
}

.entity__damage-popup__damage {
  transition: visibility 1s ease-in;
}

.entity__damage-popup__damage--critical {
  color: rgb(229, 80, 35);
}

.entity__sprite {
  border: 1px solid gray;
  box-sizing: border-box;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  background-color: rgb(57, 57, 57);
  font-weight: bold;
}

.entity__text {
  margin-top: 2px;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
}

.entity--current-character {
  color: var(--current-character);
}

.entity__level {
}

.entity__select {
  width: 80%;
  margin: 2px auto 0px auto;
  visibility: hidden;
}
.entity__select--selected {
  visibility: visible;
  color: rgb(107, 189, 237);
}

.entity__select--attacking {
  visibility: visible;
  color: rgb(228, 71, 71);
}

.red {
  color: rgb(212, 73, 73);
}
</style>
