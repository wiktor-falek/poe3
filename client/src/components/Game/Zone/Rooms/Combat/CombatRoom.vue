<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref, Ref } from "vue";
import { useMessageStore } from "../../../../../stores/messageStore";
import { usePlayerStore } from "../../../../../stores/playerStore";
import useSocketStore from "../../../../../stores/socketStore";
import Entity from "./Entity.vue";
import HUD from "./HUD/HUD.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const messageStore = useMessageStore();

const playerStore = usePlayerStore();

const props = defineProps(["room"]);

const emit = defineEmits(["leaveRoom", "abandonRun"]);

onMounted(() => {
  socket.emit("combat:next-step");
});

const playerEntity = computed(() => {
  const player = props.room.combat.allyParty.find(
    (entity: any) => entity.name === playerStore.characterData.name
  );
  return player;
});

const isPlayerTurn = ref(false);

socket.on("combat:data", (data) => {
  console.log("combat:data", data);
  props.room.combat = data.combat;
});

socket.off("combat:recent-logs")
socket.on("combat:recent-logs", (logs) => {
  for (const log of logs) {
    // console.log("combat:log", log.message);
    messageStore.pushClientSideSystemMessage(log.message);
  }
});

socket.off("combat:player-turn")
socket.on("combat:player-turn", (data) => {
  const { logs, allyParty, enemyParty } = data;
  console.log(
    "all-logs",
    logs.map((log: any) => log.message)
  );
  props.room.combat.allyParty = allyParty;
  props.room.combat.enemyParty = enemyParty;
  isPlayerTurn.value = true;
});

socket.on("combat:take-next-step", (data) => {
  console.log(data.logs);

  socket.emit("combat:next-step");
});

socket.on("combat:end", (data) => {
  const { logs, allyParty, enemyParty } = data;
  props.room.combat.allyParty = allyParty;
  props.room.combat.enemyParty = enemyParty;
  // messageStore.pushClientSideSystemMessage(log.message);
  console.log(logs);
});

const selectedTarget: Ref<number | null> = ref(null);
const selectedSkill: Ref<number | null> = ref(null);

function selectTarget(targetId: number) {
  if (selectedTarget.value === targetId) {
    selectedTarget.value = null;
  } else {
    selectedTarget.value = targetId;
  }
}

function selectSkill(skillId: number) {
  selectedSkill.value = skillId;
}

function playerAction() {
  const skillId = selectedSkill.value;
  const targetId = selectedTarget.value;
  if (skillId == null || targetId == null) {
    return messageStore.pushClientSideSystemMessage(
      `Invalid action skillId=${skillId}, targetId=${targetId}`
    );
  }
  const action = { skillId, targetId };
  socket.emit("combat:player-action", action);
}

function endTurn() {
  socket.emit("combat:player-end-turn");
}
</script>

<template>
  <div class="combat">
    <div class="party party--enemy">
      <Entity
        v-for="entity in room.combat.enemyParty"
        :entity="entity"
        :selected="selectedTarget === entity.id"
        @click="selectTarget(entity.id)"
      />
      <!-- @select-target="(targetId: number) => selectSkill(targetId)" -->
    </div>

    <div class="party party--ally">
      <Entity
        v-for="entity in room.combat.allyParty"
        :entity="entity"
        :selected="selectedTarget === entity.id"
        @click="selectTarget(entity.id)"
      />
      <!-- @select-target="(targetId: number) => selectSkill(targetId)" -->
    </div>
    <div class="">
      <p>turn order = {{ room.combat.turnOrder }}</p>
      <button @click="emit('abandonRun')">Abandon Run</button>
      <button @click="playerAction">Player Action</button>
      <button @click="endTurn">End turn</button>
      <HUD
        :actionPoints="playerEntity.actionPoints"
        @select-skill="(skillId: number) => selectSkill(skillId)"
      />
    </div>
  </div>
</template>

<style scoped>
.selected {
  border: 2px solid orange;
}

.combat {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: px;
  grid-row-gap: 0px;
  height: 100%;
}

.party--enemy {
}
.party--ally {
}
.hud {
}

.party {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid gray;
  box-sizing: content-box;
}
</style>
