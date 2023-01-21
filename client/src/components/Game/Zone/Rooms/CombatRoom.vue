<script lang="ts" setup>
import { ref, Ref } from "vue";

const props = defineProps(["room"]);

// TODO: render enemies
// TODO: render player party
// TODO: basic combat ui
</script>

<template>
  <div class="combat">
    <div class="party party--enemy">
      <div class="entity" v-for="enemy in room.enemies">
        {{ enemy.name }} (Lvl {{ enemy.lvl }})
      </div>
    </div>

    <div class="party party--ally">
      <div class="entity">Player</div>
    </div>
  </div>
</template>

<style scoped>
.combat {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  align-items: center;
}
.party {
  display: flex;
  justify-content: center;
  width: 80%;
  border: 2px solid gray;
  box-sizing: content-box;
}

.entity {
  display: flex;
  justify-content: center;
  height: 80px;
  border: 2px solid gray;
  width: calc(100% / 8);
}
</style>
