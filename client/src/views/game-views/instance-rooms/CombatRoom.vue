<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../../../../src/socket/gameServer";
import useCharacterStore from "../../../stores/characterStore";
import { onUnmounted } from "vue";
import ResourceBars from "../../../components/ResourceBars.vue";
import SkillIcon from "../../../components/SkillIcon.vue";
import { onMounted } from "vue";
import Enemy from "../../../../../game-server/src/game/entities/enemy";
import Icon from "../../../components/Icon.vue";
import { onBeforeMount } from "vue";

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

  const { turnStartUpdate } = state;
  if (turnStartUpdate) {
    const { playerId, resources } = turnStartUpdate;
    const player = room.players.find((player) => player.id === playerId);
    if (player) {
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
      }
      room.currentTurnPlayerName = player.name;
    }
  }
});

gameServer.socket.on("instance:player-action", (action) => {
  const enemies = gameServer.state.instance?.room?.enemies;
  const players = gameServer.state.instance?.room?.players;

  const attacker = players?.find((player) => player.id === action.attackerId);
  const target = enemies?.find((enemy) => enemy.id === action.targetId);

  if (target) {
    displayDamagePopup(action.attackerId, action.targetId, action.damage, action.critical);
    target.hp = Math.max(target.hp - action.damage, 0);
  }

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
});

onUnmounted(() => {
  gameServer.socket.off("instance:state-update");
  gameServer.socket.off("instance:player-action");
});

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

const characterStore = useCharacterStore();

const targetId: Ref<string | null> = ref(null);
const actionId: Ref<string | null> = ref(null);

const damagePopup: Ref<DamagePopup | null> = ref(null);

function selectTarget(id: string) {
  if (actionId.value === null) {
    targetId.value = id;
  } else {
    playerAction(id, actionId.value);
  }
}

function selectSkill(id: string) {
  if (targetId.value === null) {
    actionId.value = id;
  } else {
    playerAction(targetId.value, id);
  }
}

function playerAction(targetId: string, actionId: string) {
  if (targetId === null) {
    gameServer.state.messages.push({ content: "Invalid target", sender: "SYSTEM", group: "ERROR" });
    return;
  }

  const validActions = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

  if (actionId === null || !validActions.includes(actionId)) {
    gameServer.state.messages.push({ content: "Invalid action", sender: "SYSTEM", group: "ERROR" });
    return;
  }

  gameServer.socket.emit("instance:action", targetId, actionId);
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

function onPress(e: KeyboardEvent) {
  const utilityKeys: { [keyBind: string]: () => void } = {
    Escape: () => {
      targetId.value = null;
      actionId.value = null;
    },
    n: endTurn,
    l: leaveInstance,
  };

  const utility = utilityKeys[e.key];
  if (utility) {
    utility();
    return;
  }

  const actionKeyBinds: { [keyBind: string]: string } = {
    " ": "0",
    q: "1",
    w: "2",
    e: "3",
    r: "4",
    a: "5",
    s: "6",
    d: "7",
    f: "8",
  };

  const action = actionKeyBinds[e.key];
  if (action) {
    selectSkill(action);
    return;
  }

  const enemies = gameServer.state.instance?.room?.enemies!;

  const enemyKeyBinds: { [keyBind: string]: Enemy | undefined } = {
    1: enemies[0],
    2: enemies[1],
    3: enemies[2],
    4: enemies[3],
    5: enemies[4],
    6: enemies[5],
    7: enemies[6],
    8: enemies[7],
  };

  const enemy = enemyKeyBinds[e.key];
  if (enemy) {
    selectTarget(enemy.id);
    return;
  }
}

onBeforeMount(() => {
  // get the current instance data without iterating over each action
  gameServer.socket.emit("instance:get");
});

onMounted(() => {
  // focus the component to capture key events
  const div: HTMLDivElement | null = document.querySelector(".combat-room");
  if (div !== null) {
    div.focus();
  }
});
</script>

<template>
  <div
    class="combat-room"
    v-if="gameServer.state.instance?.room"
    @keydown="onPress($event)"
    tabindex="-1"
  >
    <div class="board" v-if="gameServer.state.instance.room">
      <div class="party party--enemy">
        <div
          class="entity"
          v-for="enemy in gameServer.state.instance.room.enemies"
          @click.stop="selectTarget(enemy.id)"
        >
          <div class="entity__damage-popup">
            <p
              v-show="damagePopup?.targetId === enemy.id"
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
        <div
          class="entity"
          v-for="player in gameServer.state.instance.room.players.sort((a, b) =>
            a.name.localeCompare(b.name)
          )"
        >
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
    <p v-else>Current turn: {{ gameServer.state.instance.room.currentTurnPlayerName }}</p>
    <h3 class="red" v-if="player && player.resources.hp <= 0">You Are Dead</h3>

    <div class="hud">
      <div class="wrapper">
        <div class="hud__side-skills">
          <SkillIcon
            keyBind="spc"
            :apCost="1"
            imgId="0"
            :selected="actionId === '0'"
            @click.stop="selectSkill('0')"
          />
        </div>
        <div class="hud__main-skills">
          <SkillIcon
            keyBind="q"
            :apCost="1"
            imgId="1"
            :selected="actionId === '1'"
            @click.stop="selectSkill('1')"
          />
          <SkillIcon
            keyBind="w"
            :apCost="1"
            imgId="1"
            :selected="actionId === '2'"
            @click.stop="selectSkill('2')"
          />
          <SkillIcon
            keyBind="e"
            :apCost="1"
            imgId="1"
            :selected="actionId === '3'"
            @click.stop="selectSkill('3')"
          />
          <SkillIcon
            keyBind="r"
            :apCost="1"
            imgId="1"
            :selected="actionId === '4'"
            @click.stop="selectSkill('4')"
          />
          <SkillIcon
            keyBind="a"
            :apCost="1"
            imgId="1"
            :selected="actionId === '5'"
            @click.stop="selectSkill('5')"
          />
          <SkillIcon
            keyBind="s"
            :apCost="1"
            imgId="1"
            :selected="actionId === '6'"
            @click.stop="selectSkill('6')"
          />
          <SkillIcon
            keyBind="d"
            :apCost="1"
            imgId="1"
            :selected="actionId === '7'"
            @click.stop="selectSkill('7')"
          />
          <SkillIcon
            keyBind="f"
            :apCost="1"
            imgId="1"
            :selected="actionId === '8'"
            @click.stop="selectSkill('8')"
          />
        </div>
        <div class="hud__actions">
          <Icon keyBind="n" imgId="1" @click="endTurn"></Icon>
          <Icon keyBind="l" imgId="0" @click="leaveInstance"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.combat-room {
  user-select: none;
}
.combat-room:focus {
  outline: none;
}
.board {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.party {
  display: flex;
  flex-direction: row;
  gap: 20px;
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
  color: var(--select);
}

.entity__select--attacking {
  visibility: visible;
  color: rgb(228, 71, 71);
}

.red {
  color: rgb(212, 73, 73);
}

/* HUD */
.hud {
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}

.hud__side-skills {
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: fit-content;
  gap: 10px;
}

.hud__main-skills {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: fit-content;
  gap: 8px;
}

.hud__actions {
  display: grid;

  gap: 8px;
}
</style>
