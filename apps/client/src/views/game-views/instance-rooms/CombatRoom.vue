<script lang="ts" setup>
import { ref, Ref } from "vue";
import * as gameServer from "../../../../src/socket/gameServer";
import useCharacterStore from "../../../stores/characterStore";
import ResourceBars from "../../../components/ResourceBars.vue";
import SkillIcon from "../../../components/SkillIcon.vue";
import { onMounted } from "vue";
import Enemy from "../../../../../game-server/src/game/entities/enemy";
import Icon from "../../../components/Icon.vue";
import RewardsModal from "../../../components/modals/RewardsModal.vue";

setInterval(async () => {
  const queue = gameServer.state.instanceActionsQueue;
  const stateUpdate = queue.dequeue();
  if (!stateUpdate) return;

  const { actions, turnStartUpdate } = stateUpdate;

  let timeout = 0;
  for (const action of actions) {
    const animationDurationMs = 0;
    // TODO: play animation

    setTimeout(() => {
      const room = gameServer.state.instance?.room;
      if (!room) return;

      displayDamagePopup(action.targetId, action.attackerId, action.damage, action.critical);

      const { targetId, attackerId, damage, critical } = action;

      (function playerAction() {
        const player = room.players.find((player) => player.id === action.attackerId);
        const enemy = room.enemies.find((enemy) => enemy.id === action.targetId);

        if (player && enemy) {
          enemy.hp = Math.max(enemy.hp - action.damage, 0);
          if (action.cost?.ap) {
            player.resources.ap -= action.cost.ap;
          }
          if (action.cost?.hp) {
            player.resources.hp -= action.cost.hp;
          }
          if (action.cost?.mp) {
            player.resources.mp -= action.cost.mp;
          }
        }
      })();

      (function enemyAction() {
        const enemy = room.enemies.find((e) => e.id === action.attackerId);
        const player = room.players.find((p) => p.id === action.targetId);

        if (player) {
          player.resources.hp = Math.max(player.resources.hp - action.damage, 0);
        }

        if (turnStartUpdate) {
          const { playerId, resources } = turnStartUpdate;
          console.log({ resources });
          if (resources) {
            const player = room.players.find((p) => p.id === playerId);
            if (player) {
              const room = gameServer.state.instance?.room;
              if (room) {
                room.currentTurnPlayerName = player.name;
              }

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
          }
        }
      })();
    }, (timeout += animationDurationMs));
  }
}, 50);

interface DamagePopup {
  targetId: string;
  attackerId: string;
  damage: number;
  critical: boolean;
}

function displayDamagePopup(
  targetId: string,
  attackerId: string,
  damage: number,
  critical: boolean
) {
  const newPopup = {
    targetId,
    attackerId,
    damage,
    critical,
  };

  damagePopup.value = newPopup;

  setTimeout(() => {
    // hide the popup if a different popup has not been displayed
    if (JSON.stringify({ ...damagePopup.value }) === JSON.stringify(newPopup)) {
      damagePopup.value = null;
    }
  }, 600);
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
  // prevent default behavior of specified keys
  if ([" "].includes(e.key)) {
    e.preventDefault();
  }
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

onMounted(() => {
  // focus the component to capture key events
  const div: HTMLDivElement | null = document.querySelector(".combat-room");
  if (div !== null) {
    div.focus();
  }
});
</script>

<template>
  <RewardsModal></RewardsModal>
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
              class="entity__damage-popup__damage"
              :class="{
                'entity__damage-popup__damage--critical': damagePopup?.critical,
                'entity__damage-popup__damage--hide': damagePopup?.targetId !== enemy.id,
              }"
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
              class="entity__damage-popup__damage"
              :class="{
                'entity__damage-popup__damage--critical': damagePopup?.critical,
                'entity__damage-popup__damage--hide': damagePopup?.targetId !== player.id,
              }"
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

    <div class="info">
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
      <p class="red" v-if="player && player.resources.hp <= 0">You Are Dead</p>
    </div>

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
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
  justify-content: center;
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

.entity__damage-popup__damage--hide {
  opacity: 0;
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
  margin: 0;
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

.info {
  text-align: center;
}

.info > * {
  margin: 0;
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
