<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { onMounted, ref, Ref } from "vue";
import { usePlayerStore } from "../../../../../stores/playerStore";
import useSocketStore from "../../../../../stores/socketStore";
import RoomSelectView from "../../RoomSelectView.vue";
import Entity from "./Entity.vue";
import HUD from "./HUD/HUD.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

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

console.log("AP", playerEntity.value.actionPoints);

const isPlayerTurn = ref(false);

socket.on("combat:data", (data) => {
  console.log("combat:data", data);
  props.room.combat = data.combat;
});

socket.on("combat:player-turn", (data) => {
  const { logs, allyParty, enemyParty } = data;
  console.log("player turn", logs);
  props.room.combat.allyParty = allyParty;
  props.room.combat.enemyParty = enemyParty;
  isPlayerTurn.value = true;
});

socket.on("combat:take-next-step", (data) => {
  console.log(data.logs);
  // player action was successful
  isPlayerTurn.value = false;

  socket.emit("combat:next-step");
});

socket.on("combat:end", (data) => {
  const { logs, allyParty, enemyParty } = data;
  props.room.combat.allyParty = allyParty;
  props.room.combat.enemyParty = enemyParty;
  console.log("Combat has ended");
  console.log(logs);
});

const target: Ref<number | null> = ref(null);
const selectedSkill: Ref<number | null> = ref(null);

function selectTarget(event: any) {
  const enemyEntityElement = event.target;
}

function selectSkill(skillId: number) {
  console.log("selected skill", skillId);
}

function playerAction() {
  const action = { name: "basic-attack", targetId: 1 };
  socket.emit("combat:player-action", action);
}
</script>

<template>
  <div class="combat">
    <div class="party party--enemy">
      <Entity
        v-for="entity in room.combat.enemyParty"
        :entity="entity"
        @click="selectTarget($event)"
      />
    </div>

    <div class="party party--ally">
      <Entity
        v-for="entity in room.combat.allyParty"
        :entity="entity"
        @click="selectTarget($event)"
      />
    </div>
    <div class="">
      <p>turn order = {{ room.combat.turnOrder }}</p>
      <button @click="emit('abandonRun')">Abandon Run</button>
      <button v-if="isPlayerTurn" @click="playerAction">Player Action</button>
      <HUD
        @select-skill="(skillId: number) => selectSkill(skillId)"
        :actionPoints="playerEntity.actionPoints"
      />
    </div>
  </div>
</template>

<style scoped>
.selected {
  border-color: orange;
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
