<script setup>
import { onMounted, ref } from "vue";
import { usePlayerStore } from "../../../../../stores/playerStore";
import useSocketStore from "../../../../../stores/socketStore";
import HUD from "./HUD/HUD.vue";
import ResourceBars from "./ResourceBars.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();

const props = defineProps(["room"]);

const emit = defineEmits(["leaveRoom"]);

console.log(props.room);

onMounted(() => {
  socket.emit("combat:next-step");
});

const isPlayerTurn = ref(false);

socket.on("combat:data", (data) => {
  console.log("combat:data", data);
  props.room.combat = data.combat
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

function playerInput() {
  const action = { name: "basic-attack", targetId: 1 };
  socket.emit("combat:player-action", action);
}
</script>

<template>
  <p>turn order = {{ room.combat.turnOrder }}</p>
  <button v-if="isPlayerTurn" @click="playerInput">Player Action</button>
  <div class="combat">
    <div class="party party--enemy">
      <div class="entity" v-for="entity in room.combat.enemyParty">
        <div class="entity__top">
          <p>{{ entity.name }} (id={{ entity.id }})</p>
          <p>Lv {{ entity.level.value }}</p>
        </div>
        <div src="" class="entity__sprite">
          <img
            src="../../../../../assets/icons/dbx7dgp-62d50af9-12c9-4a2f-b56d-0fff6149f505.gif"
          />
        </div>
        <ResourceBars :resources="entity.resources" />
      </div>
    </div>

    <div class="party party--ally">
      <div class="entity" v-for="entity in room.combat.allyParty">
        <div class="entity__top">
          <p
            :class="{
              'player-highlight':
                playerStore.characterData.name === entity.name,
            }"
          >
            {{ entity.name }} (id={{ entity.id }})
          </p>
          <p>Lv {{ entity.level.value }}</p>
        </div>
        <div src="" class="entity__sprite">
          <img src="" alt="" />
        </div>
        <ResourceBars :resources="entity.resources" />
      </div>
    </div>

    <HUD />
  </div>
</template>

<style scoped>
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

.entity {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entity__top {
  text-align: center;
}

.entity__sprite {
  /* background-color: rgb(45, 45, 45); */
  width: 96px;
  height: 96px;
}

.entity__sprite > img {
  width: 100%;
  height: 100%;
}

.player-highlight {
  color: orange;
}
</style>
