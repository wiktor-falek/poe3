<script lang="ts" setup>
import { usePlayerStore } from "../../../../../stores/playerStore";
import ResourceBars from "./ResourceBars.vue";

const playerStore = usePlayerStore();
const character = playerStore.character;

const props = defineProps(["entity", "selected"]);
</script>

<template>
  <div class="entity">
    <div class="entity__top">
      <p>
        <!-- TODO: make this highlight ONLY the player character regardless of character name -->
        <span
          :class="{
            'player-name-highlight': character.name == entity.name,
          }"
        >
          {{ entity.name }}
        </span>
      </p>
      <!-- <p>(id={{ entity.id }})</p> -->
      <p>Lv {{ entity.level.value }}</p>
    </div>
    <div
      src=""
      class="entity__sprite"
      :class="{ selected: props.selected === true }"
    >
      <!-- TODO: unhardcore sprite -->
      <img
        src="../../../../../assets/icons/dbx7dgp-62d50af9-12c9-4a2f-b56d-0fff6149f505.gif"
      />
    </div>
    <ResourceBars :resources="entity.resources" />
  </div>
</template>

<style scoped>
.selected {
  border: 1px solid var(--focus);
}

.player-name-highlight {
  color: rgb(156, 156, 231);
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
</style>
